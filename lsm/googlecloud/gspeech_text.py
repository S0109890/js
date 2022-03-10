import os
from google.cloud import speech


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = \
"gc-speech-338004-14b040295a2c.json"

# Audio recording parameters
RATE =44100
CHUNK =int(RATE /10)  # 100ms

def listen_print_loop(responses): 

    for response in responses:
        result = response.results[0]
        transcript = result.alternatives[0].transcript

        print(transcript)

        if u'종료'in transcript or u'그만'in transcript:
            print('종료합니다..')
            break

language_code ='ko-KR'  # a BCP-47 language tag

client = speech.SpeechClient()
config = types.RecognitionConfig(
	encoding =enums.RecognitionConfig.AudioEncoding.LINEAR16,
	sample_rate_hertz =RATE,
	language_code =language_code)
streaming_config = types.StreamingRecognitionConfig(config =config)

with MicrophoneStream(RATE, CHUNK) as stream:
	audio_generator = stream.generator()
	requests = (types.StreamingRecognizeRequest(audio_content =content)
				for content in audio_generator)
	responses = client.streaming_recognize(streaming_config, requests)
	
	listen_print_loop(responses)