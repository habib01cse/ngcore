import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiny',
})
@Injectable()
export class TinyPipe implements PipeTransform {
    
    transform(item: any, args:any){  
        let  tempString  =item;  
        if(item.toString().length>Number(args.split(',')[0])){
            console.log(args)
            tempString='9'+args.split(',')[1];
        }
       return tempString
    }
}