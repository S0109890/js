#!/usr/bin/env python

# Copyright 2017 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Google Cloud Speech API sample application using the streaming API.

NOTE: This module requires the additional dependency `pyaudio`. To install
using pip:

    pip install pyaudio

Example usage:
    python transcribe_streaming_mic.py
"""

# [START speech_transcribe_streaming_mic]
from __future__ import division
import os
import re
import sys
from dotenv import load_dotenv

load_dotenv(verbose=True)

from google.cloud import speech

import pyaudio
from six.moves import queue
import RPi.GPIO as GPIO
import time
from playsound import playsound
# animal 패키지에서 dog 라는 모듈을 불러와
# from _mqtt import publish


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = \
    os.getenv('GOOGLE_KEY')

# Audio recording parameters
RATE = 16000
CHUNK = int(RATE / 10)  # 100ms


class MicrophoneStream(object):
    """Opens a recording stream as a generator yielding the audio chunks."""

    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk

        # Create a thread-safe buffer of audio data
        self._buff = queue.Queue()
        self.closed = True

    def __enter__(self):
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            # The API currently only supports 1-channel (mono) audio
            # https://goo.gl/z757pE
            channels=1,
            rate=self._rate,
            input=True,
            frames_per_buffer=self._chunk,
            # Run the audio stream asynchronously to fill the buffer object.
            # This is necessary so that the input device's buffer doesn't
            # overflow while the calling thread makes network requests, etc.
            stream_callback=self._fill_buffer,
        )

        self.closed = False

        return self

    def __exit__(self, type, value, traceback):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        # Signal the generator to terminate so that the client's
        # streaming_recognize method will not block the process termination.
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        """Continuously collect data from the audio stream, into the buffer."""
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            # Use a blocking get() to ensure there's at least one chunk of
            # data, and stop iteration if the chunk is None, indicating the
            # end of the audio stream.
            chunk = self._buff.get()
            if chunk is None:
                return
            data = [chunk]

            # Now consume whatever other data's still buffered.
            while True:
                try:
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                except queue.Empty:
                    break

            yield b"".join(data)


###hear ##Speech to Text code
def listen_print_loop(responses):
    """Iterates through server responses and prints them.

    The responses passed is a generator that will block until a response
    is provided by the server.

    Each response may contain multiple results, and each result may contain
    multiple alternatives; for details, see https://goo.gl/tjCPAU.  Here we
    print only the transcription for the top alternative of the top result.

    In this case, responses are provided for interim results as well. If the
    response is an interim one, print a line feed at the end of it, to allow
    the next result to overwrite it, until the response is a final one. For the
    final one, print a newline to preserve the finalized transcription.
    """
    ##global variable
    global _data
    num_chars_printed = 0
    for response in responses:
        if not response.results:
            continue

        # The `results` list is consecutive. For streaming, we only care about
        # the first result being considered, since once it's `is_final`, it
        # moves on to considering the next utterance.
        result = response.results[0]
        if not result.alternatives:
            continue

        # Display the transcription of the top alternative.
        transcript = result.alternatives[0].transcript

        # Display interim results, but with a carriage return at the end of the
        # line, so subsequent lines will overwrite them.
        #
        # If the previous result was longer than this one, we need to print
        # some extra spaces to overwrite the previous result
        overwrite_chars = " " * (num_chars_printed - len(transcript))

        if not result.is_final:
            sys.stdout.write(transcript + overwrite_chars + "\r")
            sys.stdout.flush()

            num_chars_printed = len(transcript)

        else:
#             results {
            #   alternatives {
            #     transcript: "Let\'s go"
            #     confidence: 0.92365956
            #   }
            #   is_final: true
            #   result_end_time {
            #     seconds: 1
            #     nanos: 950000000
            #   }
            #   language_code: "ko-kr"
            # }
            # total_billed_time {
            #   seconds: 15
            # }
            print(transcript + overwrite_chars)

            # Exit recognition if any of the transcribed phrases could be
            # one of our keywords.
            if re.search(r"\b(exit|quit)\b", transcript, re.I):
                print("Exiting..")
                break
            _data=transcript + overwrite_chars
            print("_data"+_data)
            break

            num_chars_printed = 0

###main #######
#
def main():
    #Voice search sound play
    playsound("seach_voice.mp3")
    ##led on
    light()
    # See http://g.co/cloud/speech/docs/languages
    # for a list of supported languages.
    language_code = "ko-KR"  # a BCP-47 language tag

    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code=language_code,
    )

    streaming_config = speech.StreamingRecognitionConfig(
        config=config, interim_results=True
    )

    with MicrophoneStream(RATE, CHUNK) as stream:
        audio_generator = stream.generator()
        requests = (
            speech.StreamingRecognizeRequest(audio_content=content)
            for content in audio_generator
        )

        responses = client.streaming_recognize(streaming_config, requests)

        # Now, put the transcription responses to use.
        listen_print_loop(responses)
    melody() #sound play
    light() #led off
    #respenses Value -> _data
    print("speech to text end", _data)
    playsound("button-voice.mp3")

#Button1 event callback function
button1_state = False
button1_state_change = False
def button1Pressed(channel):
    # 16 Right = send mqtt to web front
    #####mqtt
    playsound("Mouse Click Sound Effect.mp3")
    print("Right",channel)
    # if complete:
    #     exit()


#Button2 event callback function
button2_state = False
button2_state_change = False
def button2Pressed(channel):
    #12 Left = Wrong Words
    #reStart main
    playsound("Mouse Click Sound Effect.mp3")
    print("Left")
    main()




def melody():
    sound_pin = 18
    GPIO.setup(sound_pin,GPIO.OUT)

    #pwm(핀번호, 헤르쯔 ##)
    #소리감도 0-100 %
    pwm = GPIO.PWM(sound_pin,1000.0)
    pwm.start(0)

    #sound
    melody =  [262,294,330,349,392,440,494,523]

    for note in range(0,6):
        pwm.ChangeFrequency(melody[note])
        pwm.ChangeDutyCycle(50)
        time.sleep(0.1)
        pwm.ChangeDutyCycle(0)

on = False
def light():
    #light turn on / off
    global on
    led_pin = 24  
    GPIO.setmode(GPIO.BCM)
    #light on
    GPIO.setup(led_pin, GPIO.OUT)     
    on = True if not on else False
    if on:
        GPIO.output(led_pin, True)
    else :
        GPIO.output(led_pin, False)



if __name__ == "__main__":
    try:
        # init()
        #1=Right
        button1_pin = 16
        #2=Left
        button2_pin = 12

        GPIO.setwarnings(True)
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(button1_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)     #Button1 입력 GPIO16
        GPIO.setup(button2_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)       #Button2 입력 GPIO12

        # GPIO.remove_event_detect(button1_pin)
        # GPIO.remove_event_detect(button2_pin)

        #Event : Button Click
        # GPIO.add_event_detect(button1_pin, GPIO.RISING, callback=button1Pressed)
        GPIO.add_event_detect(button2_pin, GPIO.RISING ,callback=button2Pressed)

        #main
        main()
        #Right =1= right / Wrong =2= Left = reStart
        #Wating for Button1(Right)
        while True:
            GPIO.wait_for_edge(button1_pin, GPIO.FALLING)
            print("Button pressed! save",_data)
            #data = Word(for search a book)
    except KeyboardInterrupt:
        print("CTRL+C used to end Program")

    GPIO.cleanup()


