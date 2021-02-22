const { SDK_VERSION } = require("firebase-admin");

class Table {

    /**
     * 
     * @param {String[][]} data 
     * @param {Number} spacing 
     */
    constructor(headers,data, spacing){
        this.headers = headers;
        this.data = data;
        this.spacing = spacing;
        this.rows = data.length;
        this.maxCellLength  = Array();
        this.table = Array();
    }

    calculateMaxCellLength(){
        let max = -1;

        for (let i = 0; i < this.data[0].length; i++){
            max = this.headers[i].length;
            for (let j = 0; j < this.rows; j++){
                if (max < this.data[j][i].length){
                    max = this.data[j][i].length
                }
            }
            this.maxCellLength.push(max);
        }
    }

    addStrSpaces(str,number){
        for  (let i = 0; i < number;  i++){
            str += ' ';
        }
        return str;
    }

    makeLine(str){
        let line = '';
        for (let i = 0; i < str.length-1; i++){
            line += '-';
        }
        return line+'\n';
    }

    generateHeaders(){
        let str = '';
        for(let i = 0; i < this.headers.length; i++){
            let maxLength = this.maxCellLength[i] + this.spacing;
            let difference = maxLength - this.headers[i].length;
            if (difference > 0){
                str += this.addStrSpaces(this.headers[i], difference);
            }
        }
        return str+'\n';
    }

    generateTable(){
        for (let i = 0; i < this.rows; i++){
            
            let str = '';
            
            for (let j = 0; j < this.data[0].length; j++){
                let maxLength = this.maxCellLength[j] + this.spacing;
                let difference = maxLength - this.data[i][j].length;
                
                if (difference > 0){
                    str += this.addStrSpaces(this.data[i][j],difference);
                }
            }
            this.table.push(str);
        }
    }




    exportTable(){
        let tableStr = this.generateHeaders();

        for (let i = 0; i < this.table.length; i++){
            tableStr += this.table[i] + '\n';
        }
        return tableStr;
    }

    exportTableWithLine(){
        let headerStr = this.generateHeaders();
        let lineStr = this.makeLine(headerStr);
        let tableStr = lineStr+headerStr+lineStr;
        for (let i = 0; i < this.table.length; i++){
            tableStr += this.table[i] + '\n';
        }
        return tableStr+lineStr;
    }



}


module.exports = Table;