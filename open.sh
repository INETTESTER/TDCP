#!/bin/bash
##########################################################################
##########################################################################
##########################################################################
##########################################################################
##########################################################################
                     projectname="oauth_create_scb" #ตั้งชื่อ projhttpsect ให้เหมือนกัน
                     google_sheet="https://docs.google.com/spreadsheets/d/13ZqmW82FnQj_uY-9VjUCPNvBMFEZJcodK1AmRn_euW0/edit?gid=180143788#gid=180143788" 
                     id="18"                 #เปลี่ยน id ทุกครั้งที่ยิง
                     user="1";            #จำนวนผู้ใช้งาน
                     durationx="1";         #วินาที
                     scenario="3"           #scenario="1" ยิงเเบบกำหนด request (duration ได้แค่ 1 วินาที)
                     cid="112"                 #scenario="2" ยิงเเบบกำหนด VUs  (กำหนดว่า user x คน ใช้ระบบ x วินาที)
                                            #scenario="3" ยิงเเบบกำหนด request แต่ไม่แม่นยำ (duration กี่วินาทีก็ได้)
##########################################################################
##########################################################################
##########################################################################
##########################################################################
##########################################################################


































filename="filename"    #ชื่อ file report **ใช้ scenario
folder_report=$(date +"%d-%m-%y") #ห้ามเปลี่ยน
if [ ! -d "report/$folder_report" ]; then
  # ถ้าไม่มีให้สร้างโฟลเดอร์ folder
  mkdir "report/$folder_report"
fi

filenamex="$filename-$user-$id"
#echo $filenamex
# รัน main/main.js ก่อนและรอให้เสร็จสิ้น
k6 run --env id="$id" --env cid="$cid" --env projectname="$projectname" --env scenariox="$scenario"  --env user="$user" --env durationx="$durationx" --summary-export=report/"$folder_report"/"$filenamex".json main/main.js 

# รอจนกว่าการรัน main/main.js จะเสร็จสิ้น
wait

# รัน main/insertdata.js
k6 run --env filename="$filenamex" --env projectname="$projectname" --env date="$folder_report" --env id="$id" --env user="$user" --env durationx="$durationx" --env google_link="$google_sheet" gafana/insertdata.js --no-summary
