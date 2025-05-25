const getStructuredDate = (date) => {
    
    if (!date) return "";
    
    const newDateArr = date.toString().split(" ")
    
    return `${newDateArr[2]} ${newDateArr[1]} ${newDateArr[3]}`;
    
}

export default getStructuredDate;