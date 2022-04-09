
class ReadBySep{
    constructor(str, sep = "\\s+", initialIndex = 0){
        this.values = str.split(new RegExp(sep));
        this.index = initialIndex;
    }

    getValues(){
        return this.values
    }
    setIndex(index){
        this.index = index
    }
    getIndex(){
        return this.index
    }

    getNextValue(){
        this.setIndex(this.getIndex() + 1)
        return this.getValues()[this.getIndex() - 1] 
    }

}


export default ReadBySep;