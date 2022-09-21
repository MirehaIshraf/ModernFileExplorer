//require node modules

const calculateSizeF = stats => {
    
    //size in bytes
    const filesizeBytes = stats.size; //bytes

    //size in human readable format
    const units = "BKMGT";


    const index = Math.floor(Math.log10(filesizeBytes)/3);

    //700 -> 700/1000^0
    //10000->10000/1000^1
    //10000000->10000/1000^2
    const filesizeHuman = (filesizeBytes/Math.pow(1000,index)).toFixed(1);
    
    const unit = units[index];
   
    filesize = `${filesizeHuman}${unit}`;

    return [filesize, filesizeBytes];
};

module.exports = calculateSizeF;