/*UI ELEMENTS */

const UIgenContainer = document.querySelector ('.gen_pokemons');
const UInavigation = document.querySelectorAll ('.menu-link');
const UIimageContainer = document.querySelector ('#image-container');
const UInameIdContainer = document.querySelector ('#name-id-container');
const UIbaseinfo = document.querySelector ('#base-info');
const UIbaseStats = document.querySelector ('#base-stats');
const UIscrollUp = document.querySelector ('#scroll-up');
const UIscrollDown = document.querySelector ('#scroll-down');
const shinyBtn = document.querySelector('#shiny');
console.log(shinyBtn);

/*pokemon genrations startPoint and Endpoint*/

const POKEREGIONS = {
  KANTO: {
    start: 1,
    end: 152,
  },
  JOHTO: {
    start: 152,
    end: 252,
  },
  HOENN: {
    start: 252,
    end: 387,
  },
  SINNOH: {
    start: 387,
    end: 494,
  },
  UNIMA: {
    start: 494,
    end: 650,
  },
  KALOS: {
    start: 650,
    end: 722,
  },
};

/*fetch data of all pokemons of one generation */

function givePokemons (start, end) {
  for (i = start; i < end; i++) {
    fetch (`https://pokeapi.co/api/v2/pokemon/${i}`, {
      method: 'GET',
    })
      .then (response => {
        return response.json ();
      })
      .then (data => {
        let newPokemon = {
          name: data.name,
					id: data.id,
					type : data.types,
          sprite: data.sprites.other['official-artwork'].front_default,
        };

        return newPokemon;
      })
      .then (poke => {
        setTimeout (displaySprite (poke.sprite, poke.id, poke.name, poke.type, 10000));
      });
  }
}


/*function to display pokemons sprite on request*/

function displaySprite (src, id, name, types) {
	



	let pokeCard = document.createElement('div');
	pokeCard.classList.add('poke-box');
	
	
	let spriteContainer = document.createElement('div');
	spriteContainer.classList.add('sprite-container');
	/* spriteContainer.classList.add(`${poketype}`); */
	

	let pokeimage = document.createElement ('img');
  pokeimage.src = src;
  
  pokeimage.className = 'pokemon_sprite';
	pokeimage.id = id;
	
	let nameContainer = document.createElement('div');
	nameContainer.classList.add('sprite-name');
	let pokename = document.createElement('h3');
	pokename.innerText = name.toUpperCase();
	nameContainer.appendChild(pokename);
	nameContainer.classList.add('sprite-name');
	
	let poketype = [];
	

	types.forEach(element =>{
		poketype.push(element.type.name);
	})

	if(poketype.length > 1){
		poketype.forEach(element =>{
			
			let typesContainer = document.createElement('div');
			typesContainer.classList.add("dbl-type-color");
			let type = element;
			
			typesContainer.classList.add(`${element}`);
			pokeCard.appendChild(typesContainer);
			
		})
	} else{
		let typeContainer = document.createElement('div');
		let type = poketype[0];
		
		typeContainer.classList.add("type-color");
		typeContainer.classList.add(type);
		
		pokeCard.appendChild(typeContainer);
	} 

	pokeCard.style.order = id;
	
	spriteContainer.appendChild(pokeimage);
	spriteContainer.appendChild(nameContainer)
	pokeCard.appendChild(spriteContainer);
  UIgenContainer.appendChild(pokeCard);
  
}



/* display all pokemons of the selected generation*/


UInavigation.forEach (element => {
  element.addEventListener ('click', function (e) {
    let region = e.target.innerText;

    console.log (POKEREGIONS[`${region}`].end);
    UIgenContainer.innerHTML = '';
    givePokemons (POKEREGIONS[`${region}`].start, POKEREGIONS[`${region}`].end);
  });
});



/* display pokemon informations */

UIgenContainer.addEventListener ('click', function (e) {
  if (e.target.id !== '') {
    let id = e.target.id;

    fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then (response => {
        return response.json ();
      })
      .then (data => {
        console.log (data);

        let pokemon = {
          name: data.name,
          id: data.id,
          sprite: data.sprites.other['official-artwork'].front_default,
          types: data.types,
          height: data.height,
          weight: data.weight,
					stats: data.stats,
					species : data.species.name
        };

        return pokemon;
      })
      .then (creature => {
				
        displayPokeImage (creature.sprite, creature.name);
        addNameId (creature.name, creature.id);
        addBaseInfo (creature.types, creature.height, creature.weight);
				showStats (creature.stats);
				
        
      });
  }
});



function displayPokeImage (src, name) {
  
  UIimageContainer.innerHTML = '';
  let image = document.createElement ('img');
  image.src = src;
	image.id = `${name}`;
	
  image.className = 'poke-image';

  UIimageContainer.appendChild (image);
}




/* FUNCTION TO DISPLAY THE POKEMON NAME AND ID */


function addNameId (name, id) {
  UInameIdContainer.innerHTML = '';

  if (id < 10) {
    id = '00' + id;
  } else if (id < 100 && id > 10) {
    id = '0' + id;
  }
  let title = document.createElement ('h2');
  title.classList = 'title';
  title.innerText = name.toUpperCase () + '          N°:' + id;

  UInameIdContainer.appendChild (title);
}




/* FUNCTION TO DISPLAY POKEMON TYPE E PHISICAL INFO */


function addBaseInfo (type, height, weight) {
  UIbaseinfo.innerHTML = '';

  let pokeType = type;
  let pokeHeight = height / 10 + 'm';
  let pokeWeight = weight / 10 + 'Kg';

  pokeType.forEach (type => {
    let newtype = document.createElement ('span');
    newtype.classList = type.type.name;
    newtype.classList.add ('poke-type');
    newtype.innerText = type.type.name.toUpperCase ();

    UIbaseinfo.appendChild (newtype);
  });

  let spanHeight = document.createElement ('span');
  let spanWeight = document.createElement ('span');
  spanHeight.className = 'physical-characteristics';
  spanWeight.className = 'physical-characteristics';

  spanHeight.innerText = 'Height: ' + pokeHeight;
  spanWeight.innerText = 'Weight: ' + pokeWeight;

  UIbaseinfo.appendChild (spanHeight);
  UIbaseinfo.appendChild (spanWeight);
}



/*FUNCTION TO DISPLAY POKEMON BASIC STATS*/


function showStats (stats) {
  UIbaseStats.innerHTML = ' ';
  stats.forEach (stat => {
    let singleStat = document.createElement ('div');
    singleStat.className = 'single-stat';
    let statGraphic = document.createElement ('div');
    statGraphic.className = 'stat-graphic';
    let graphicValue = document.createElement ('div');
    graphicValue.className = 'graphic-value';
    graphicValue.style.width = stat.base_stat + 'px';
    singleStat.appendChild (
      document.createTextNode (
        stat.stat.name.toUpperCase () + ' : ' + stat.base_stat
      )
    );
    statGraphic.appendChild (graphicValue);
    UIbaseStats.appendChild (singleStat);
    UIbaseStats.appendChild (statGraphic);
  });
}



document.onreadystatechange = givePokemons (
  POKEREGIONS.KANTO.start,
  POKEREGIONS.KANTO.end
);
document.onreadystatechange = fetch (
  'https://pokeapi.co/api/v2/pokemon/bulbasaur'
)
  .then (response => {
    return response.json ();
  })
  .then (data => {
    console.log (data);

    let pokemon = {
      name: data.name,
      id: data.id,
      sprite: data.sprites.other['official-artwork'].front_default,
      types: data.types,
      height: data.height,
      weight: data.weight,
      stats: data.stats,
    };

    return pokemon;
  })
  .then (creature => {
    displayPokeImage (creature.sprite, creature.name);
    addNameId (creature.name, creature.id);
    addBaseInfo (creature.types, creature.height, creature.weight);
		showStats (creature.stats);
		
  });



	
/*CREATION OF CAROUSEL */
/*carousel divs*/

const carousel = document.querySelector ('#info-container');
const prevBtn = document.querySelector ('#prev_btn');
const nextBtn = document.querySelector ('#next_btn');

let size = carousel.clientWidth;
let count = 1;
carousel.style.transform = `translateX(${-size * count}px)`;

console.log (carousel);
nextBtn.addEventListener ('click', () => {
	size = carousel.clientWidth;
  if (count < 2) {
    count++;
    carousel.style.transition = 'transform 0.4s ease-in-out';
    carousel.style.transform = `translateX(${-size * count}px)`;
  }
});
prevBtn.addEventListener ('click', () => {
  if (count > 0) {
    carousel.style.transition = 'transform 0.4s ease-in-out';
    count--;
    carousel.style.transform = `translateX(${-size * count}px)`;
  }
});






function getspecie(){
	let chainevo = [];
	fetch("https://pokeapi.co/api/v2/pokemon-species/3")
	.then(response => {return response.json()})
	.then(data => {
		fetch(data.evolution_chain.url)
		.then(reponse => {return reponse.json()})
		.then(data => {
			console.log(data);
			chainevo.push(data.chain.species.name);
			chainevo.push(data.chain.evolves_to);
		})
	})
	console.log(chainevo);
}



getspecie();




