export class Container {
    constructor() {
        this.dateCreated;
        this.description;
        this.nasaId;
        this.title;
        this.mediaType;
        this.href;
    }

    setter(dateCreated, description, nasaId, title, mediaType, href) {
        this.dateCreated = dateCreated;
        this.description = description;
        this.nasaId = nasaId;
        this.title = title;
        this.mediaType = mediaType;
        this.href = href;
    }    

    createOuputContent(index, checkBoxArray, containerArray){
        console.log(`inside createOuputContent: index is ${index} , array is checkBoxArray`);
        let outputArray = [];
        let image = `<figure><img src="${containerArray[index].href}" alt="${containerArray[index].description}" class="img-fluid"></figure>`;
        outputArray.push(image);
        for (let i = 0; i < checkBoxArray.length; i++) {
            if (checkBoxArray[i] === "title"){
                $('.showTitle').empty().text(`<span class="coralColor">Title: </spn>${containerArray[index].title}`);
                outputArray.push(image);
            }
            else if (checkBoxArray[i] === "dateCreated"){
                $('.showDateCreated').empty().text(`Date Created: ${containerArray[index].dateCreated}`);
                outputArray.push(image);
            }
            else if (checkBoxArray[i] === "description"){
                $('.showDescription').empty().text(`Description: ${containerArray[index].description}`);
                outputArray.push(image);
            }
            else if (checkBoxArray[i] === "href"){
                $('.showHref').empty().text(`Image URL is ${containerArray[index].href}`);
                outputArray.push(image);
            }
                
            return outputArray;
        }
        
        
       
       
        

        

    }

    calculatePrice (pizzaSize, pizzaToppings) {
        var totalPrice = 0;
        var sizePrice = 0;
        switch (this.pizzaSize) {
          case 'ExtraLarge':
            sizePrice = 14;
            //console.log('Loop: ExtraLarge Pizza Costs $14.');
            break;
          case 'Large':
            sizePrice = 12;
            //console.log('Loop:Large Pizza Costs $12.');
            break;
          case 'Medium':
            sizePrice = 10;
            //console.log('Loop:Medium Pizza Costs $10.');
            break;
          case 'Small':
            sizePrice = 8;
            //console.log('Loop:Small Pizza Costs $8.');
            break;
        }
        this.totalPrice = sizePrice + (this.pizzaToppings.length * 1);
        //console.log(`Length:Calculated price::${this.pizzaToppings.length}:${this.totalPrice}`);
        return this.totalPrice;
      }

}