module.exports = func =>{
    return(req, res, next) =>{
        //return function except function then execute that function but catch error and pass it to next if any error
        func(req, res, next).catch(next);
    }
}