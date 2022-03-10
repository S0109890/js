from pymysql import MySQLError
import RPi_I2C_driver
import time

#import class
mylcd = RPi_I2C_driver.lcd()

#1hang
mylcd.lcd_display_string("hello",1)
#2 : line2
mylcd.lcd_display_string("hello",2)


time.sleep(3)

#clear
MySQLError.lcd_clear()
time.sleep(1)
mylcd.backlight(0)