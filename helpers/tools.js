const ctrl ={};
ctrl.codeGenerate = () =>{
    const possible ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let randomNumber = 0;
    for(let i =0; i<=16; i++){
        randomNumber += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return randomNumber;
}
ctrl.codeEmailGenerate = () =>{
    const possible ='pXYZ90qrstu6vwxbcyzABCDEFGHIJKLMNOade123hijklm78noPQRSTUVW45fg';
    let randomNumber='E';
    for(let i =0; i<=4; i++){
        randomNumber += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return randomNumber;
}
ctrl.codePhoneGenerate = () =>{
    const possible ='6789ABCDEYZ12fghijklyzTUVWXtuvw345mnopqrsFGHIJKLabcdexMNOPQRS0';
    let randomNumber='P';
    for(let i =0; i<=4; i++){
        randomNumber += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return randomNumber;
}



module.exports = ctrl;