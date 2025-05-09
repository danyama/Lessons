function createDate () {
    const dateTime = new Date();
    const todayWeekday = dateTime.toLocaleDateString("pt-BR", {weekday:"long"});
    const todayWeekdayStylized = todayWeekday[0].toUpperCase() + todayWeekday.slice(1)

    const todayDate = dateTime.toLocaleDateString("pt-BR");
    const nowTime = dateTime.toLocaleTimeString("pt-BR", {timeStyle:"short"});

    return `${todayWeekdayStylized} (${todayDate}) às ${nowTime}`
}

export default createDate;