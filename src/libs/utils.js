function convertDate(inputFormat) {
    var str = inputFormat.split('-')
    return str.reverse().join('/')
}

function convertTime(inputFormat) {
    var str = inputFormat.split(' ')
    str = str[1].substr(0,5)
    return str
}

function ordenaDatas(datas) {
    return datas.sort()
}

export {
    convertDate,
    convertTime,
    ordenaDatas
}