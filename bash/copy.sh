cd /Users/lvhongbin/Desktop/github/MyBlogServer/log
cp access.log `date +%Y-%m-%d-access.log`
echo "" > access.log

cp error.log `date +%Y-%m-%d-error.log`
echo "" > error.log

cp event.log `date +%Y-%m-%d-event.log`
echo "" > event.log