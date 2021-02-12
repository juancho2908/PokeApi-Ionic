import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import {PokemonService} from './../services/pokemon.service'; //importo el pokemon Service

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset=0
  pokemon=[];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;//Este parametro permite seguir cargando mas datos y los presenta
  constructor(private pokeService: PokemonService) { }

  ngOnInit() {
    this.loadPokemon(); // Envio el parametro de load pokemon
  }

  // El load pokemon obtendra los datos del pokemonSevice
  loadPokemon(loadMore = false, event?){
    if(loadMore){
      this.offset+=25; //Aqui le digo que por medio de un evento me cargue mas datos pero esta vez ya no inicia de 0 si no desde el limite 25
    }
    this.pokeService.getPokemon(this.offset).subscribe(res =>{
        this.pokemon = [...this.pokemon, ...res];

        if (event){
          event.target.complete(); //Finalmente me completa los datos
        }
        if(this.offset == 125){
          this.infinite.disabled = true; // Aqui le digo que si la funcion llega hasta 125 me desahabilite los demas pokemons.
        }
    });

  }
  onSearchChange(e){ //Esta funcion es para buscar los pokemons
    let value =e.detail.value; //evaluar los datos de los pokemon para la busqueda
    if (value ==''){//Voy a ingresar la id y que me genere la busqueda
      this.offset = 0; //Me va a buscar desde el id 0
      this.loadPokemon();//me carga el resultado
      return;//retorna el valor
    }
    this.pokeService.findPokemon(value).subscribe(res =>{
      this.pokemon = [res]; //En este caso si lo encuentra me presenta el resultado
    }, err =>{
      this.pokemon = []; // caso contrario me presenta campos vacios.
    });
  }

}
