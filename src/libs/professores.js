
export const moduloProfessores = {

    convertTime(inputFormat) {
        var str = inputFormat.split(' ')
        str = str[1].substr(0,5)
        return str;
    },
    teste (msg) {
        return msg + ' teste'
    }

}

