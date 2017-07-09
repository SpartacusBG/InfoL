import {Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform{
  transform(text: string, numLetters: number){
    if(numLetters === undefined){
      return text.toUpperCase();
    } else {
      return text.substring(0, numLetters).toUpperCase() + text.substring(numLetters, text.length);
    }
  }
}