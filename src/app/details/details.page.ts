import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: any;//Declaro la variable details la misma me va a presentar los detalles.
 
  slideOpts = {//Parametro que permite mover las imagenes
    autoplay: {//Le indico que me corra las imagenes automaticamente
      delay: 1000,
      disableOnInteraction: false
    }
  };
 
  constructor(private pokeService: PokemonService, private route: ActivatedRoute) { }
 
  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(details => {
      this.details = details;
    });
  }
}