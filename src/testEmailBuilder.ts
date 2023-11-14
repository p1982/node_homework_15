import EmailBuilder from "./bll/emailBuilder/emailBuilder.service.ts";

const builder = new EmailBuilder();
builder   
.key("town", "Florida") 
.greeting("Hi, {name},")   
.subscription("Your friend, John.")   
.addParagraph("I have a bussiness for you in {town}.")   
.addParagraph("Call me, let's meet in {town}.")   
.key("name", "Bob")   
const html = builder.html;
console.log(html);
