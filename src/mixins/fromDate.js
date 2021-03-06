export default {
    methods: {
        fromTime(time) {
            let d = new Date(time);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let date = d.getDate();
            date = date > 9 ? date : '0' + date;
            let hours = d.getHours();
            hours = hours > 9 ? hours : '0' + hours;
            let day = ['七', '一', '二', '三', '四', '五', '六'][d.getDay()];
            let minutes = d.getMinutes();
            minutes = minutes > 9 ? minutes : '0' + minutes;
            let seconds = d.getSeconds();
            seconds = seconds > 9 ? seconds : '0' + seconds;
            return (year + '年' + month + '月' + date + '日' + ' 星期' + day + '  ' + hours + ':' + minutes + ':' + seconds)
        }
    },
}