//EmailBuilder  
//const builder = new EmailBuilder(); 
//builder   
//.greeting("Hi, {name},")   
//.subscription("Your friend, John.")   
//.addParagraph("I have a bussiness for you in {town}.")   
//.addParagraph("Call me, let's meet in {town}.")   
//.key("name", "Bob")   
//.key("town", "Florida") 
//const html = builder.html; 
// <h3>Hi, Bob,</h3> </br> <p>I have a bussiness for you in Florida.</p> </br> <p>Call me, let's meet in Florida.</p> </br> <p>Your friend, John.</p>
import {Service} from 'typedi';
interface Builder {
    greating: string,
    subscription: string,
    paragraph: string[]
    keys:{[key: string]: string}
}

@Service()
class EmailBuilder {
    email: string
    builder: Builder
  constructor() {
    this.email = "";
    this.builder = {
        greating: "",
        subscription: '',
        paragraph: [],
        keys: {}
    }
    
  }

  greeting(greeting:string):EmailBuilder {
    if(greeting){
        this.builder.greating = `<h3>${greeting}</h3> <br>`
    }
    return this;
  }

  subscription(subscription:string):EmailBuilder {
    if(subscription){
        this.builder.subscription = `<p>${subscription}</p> <br>`
    }
    return this;
  }

  addParagraph(paragraph:string):EmailBuilder {
    const p = `<p>${paragraph}</p> <br>`
    this.builder.paragraph = [...this.builder.paragraph, p]
    return this;
  }
  key(key:string, value:string):EmailBuilder {
    this.builder.keys[key] = value
    return this;
  }

  get html():string {
    this.email = `${this.builder.greating}
    ${this.builder.paragraph.join("<br>")}
    ${this.builder.subscription}
    `;
    for (const key in this.builder.keys) {
      const placeholder = `{${key}}`;
      this.email = this.email.replace(new RegExp(placeholder, "g"), this.builder.keys[key]);
    }
    return this.email
  }
}

export default EmailBuilder

// // Example usage
// const builder = new EmailBuilder();
// const html = builder
//   .greeting("Hi, {name},")
//   .subscription("Your friend, John.")
//   .addParagraph("I have a business for you in {town}.")
//   .addParagraph("Call me, let's meet in {town}.")
//   .key("name", "Bob")
//   .key("town", "Florida")
//   .html;

// console.log(html);