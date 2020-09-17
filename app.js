/*UI ELEMENTS */

const UIgenContainer = document.querySelector('.gen_pokemons');
const UInavigation = document.querySelectorAll('.menu-link');
const UIimageContainer = document.querySelector('#image-container');
const UInameIdContainer = document.querySelector('#name-id-container');
const UIbaseinfo = document.querySelector('#base-info');
const UIbaseStats = document.querySelector('#base-stats');
const UIscrollUp = document.querySelector('#scroll-up');
const UIscrollDown = document.querySelector('#scroll-down');


/*gen startPoint and Endpoint*/

/* const KANTO = {
	start : 1,
	end : 152
};
const JOHTO = {
	start : 152,
	end : 252
};
const HOENN = {
	start : 252,
	end : 387
}
const SINNOH = {
	start : 387,
	end : 494
} */

const POKEREGIONS = {
	KANTO : {
		start : 1,
		end : 152
	},
	JOHTO : {
		start : 152,
		end : 252
	},
	HOENN : {
		start : 252,
		end : 387
	},
	SINNOH : {
		start : 387,
		end : 494
	},
	UNIMA : {
		start : 494,
		end : 650
	},
	KALOS : {
		start : 650,
		end : 722
	}

}









 

 function givePokemons(start, end){

	for( i = start; i < end; i++){
		fetch(`https://pokeapi.co/api/v2/pokemon/${i}`, {
	'method' : 'GET'
	})
	.then( response => {return response.json()})
	.then( data =>{
		let newPokemon = {
			name : data.name,
			id : data.id,
			sprite : data.sprites.other['official-artwork'].front_default
		}
		
		return newPokemon;
	})
	.then( poke =>{
		
		
		setTimeout(displayPokemon(poke.sprite, poke.id, 10000));
		
	})
	
	

}
 }



 /* givePokemons(KANTO.start, KANTO.end); */




function displayPokemon(src, id){
	
	let pokeimage = document.createElement('img');
	pokeimage.src = src;
	pokeimage.style.order = id;
	pokeimage.className = "pokemon_sprite";
	pokeimage.id = id;

	UIgenContainer.appendChild(pokeimage);

}




UInavigation.forEach(element =>{
	element.addEventListener('click', function(e){
		let region = e.target.innerText;
		
		console.log(POKEREGIONS[`${region}`].end);
		UIgenContainer.innerHTML = "";
	 	givePokemons(POKEREGIONS[`${region}`].start, POKEREGIONS[`${region}`].end);
		
	})
})


/* display pokemon infomrations */


UIgenContainer.addEventListener('click', function(e){
	if(e.target.id !== ""){
		
		let id = e.target.id;

		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(response =>{return response.json();})
		.then(data =>{
			
			console.log(data);

			let pokemon = {
				name : data.name,
				id : data.id,
				sprite : data.sprites.other['official-artwork'].front_default,
				types : data.types,
				height : data.height,
				weight: data.weight,
				stats : data.stats
			}

			return pokemon;
		}).then(creature =>{

			addSprite(creature.sprite, creature.types);
			addNameId(creature.name, creature.id);
			addBaseInfo(creature.types, creature.height, creature.weight);
			showStats(creature.stats);
		})
		
	}
})



function addSprite(src, type){
	
	
	type.forEach(element=>{
		if(element.type.name === 'water'){
			UIimageContainer.style.backgroundImage = "url(img/sea.png)";
		}else if(element.type.name === 'ground' || element.type.name === 'rock'){
			UIimageContainer.style.backgroundImage = "url(img/cave.jpg)";
		}else{
			UIimageContainer.style.backgroundImage = "url(img/forest.jpg)";
		}
	})
	UIimageContainer.innerHTML = "";
	let image = document.createElement('img');
	image.src = src;
	image.className = 'poke-image';

	UIimageContainer.appendChild(image);

}

/* FUNCTION TO DISPLAY THE POKEMON NAME AND ID */
function addNameId(name, id){

	UInameIdContainer.innerHTML = "";

	if(id < 10){
		id = "00" + id;
	}else if( id < 100 && id > 10){
		id = "0" + id;
	}
	let title = document.createElement('h2');
	title.classList = 'title';
	title.innerText = name.toUpperCase() + "          N°:" + id;

	UInameIdContainer.appendChild(title);

}



/* FUNCTION TO DISPLAY POKEMON TYPE E PHISICAL INFO */
function addBaseInfo(type, height, weight){
	UIbaseinfo.innerHTML = "";
	
	let pokeType = type;
	let pokeHeight = height/10 + "m";
	let pokeWeight = weight/10 + "Kg";
	
	
	pokeType.forEach(type =>{
		
		let newtype = document.createElement('span');
		newtype.classList = type.type.name;
		newtype.classList.add('poke-type');
		newtype.innerText = type.type.name.toUpperCase();

		UIbaseinfo.appendChild(newtype);
		
	})

	let spanHeight = document.createElement('span');
	let spanWeight = document.createElement('span');
	spanHeight.className = 'physical-characteristics';
	spanWeight.className = 'physical-characteristics';

	spanHeight.innerText = "Height: " + pokeHeight;
	spanWeight.innerText = "Weight: " + pokeWeight;
	
	UIbaseinfo.appendChild(spanHeight);
	UIbaseinfo.appendChild(spanWeight);
	
}

/*FUNCTION TO DISPLAY POKEMON BASIC STATS*/
function showStats(stats){
	UIbaseStats.innerHTML = " ";
	stats.forEach((stat)=>{
		let singleStat = document.createElement('div');
		singleStat.className = "single-stat";
		let statGraphic = document.createElement('div');
		statGraphic.className = 'stat-graphic';
		let graphicValue = document.createElement('div');
		graphicValue.className = 'graphic-value';
		graphicValue.style.width = stat.base_stat + "px";
		singleStat.appendChild(document.createTextNode( stat.stat.name.toUpperCase() + " : " + stat.base_stat));
		statGraphic.appendChild(graphicValue);
		UIbaseStats.appendChild(singleStat);
		UIbaseStats.appendChild(statGraphic);
	})

	
}





/* document.addEventListener("loadstart", function(){
	 givePokemons(KANTO.start, KANTO.end);
	console.log('ciao');
})
 */

 document.onreadystatechange = givePokemons(POKEREGIONS.KANTO.start, POKEREGIONS.KANTO.end);
 document.onreadystatechange = fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
 .then(response =>{return response.json();})
		.then(data =>{
			
			console.log(data);

			let pokemon = {
				name : data.name,
				id : data.id,
				sprite : data.sprites.other['official-artwork'].front_default,
				types : data.types,
				height : data.height,
				weight: data.weight,
				stats : data.stats
			}

			return pokemon;
		}).then(creature =>{

			addSprite(creature.sprite, creature.types);
			addNameId(creature.name, creature.id);
			addBaseInfo(creature.types, creature.height, creature.weight);
			showStats(creature.stats);
		})