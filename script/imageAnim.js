(() => {
	console.log('fired');

	// to make sure that your javascript is synced in with the web
	// set up the puzzle pieces and boards
	//  need a reference to each piece that we want to create
	const thePieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	// get a reference to the drag side
	let piecesBoard = document.querySelector(".puzzle-pieces");
	let puzzleBoard = document.querySelector(".puzzle-board");

	// get a reference to the buttons at the bottom so we can change the puzzle
	let puzzleSelectors = document.querySelectorAll("#buttonHolder img");

	// get a reference to the drop areas
	let dropZones = document.querySelectorAll('.drop-zone');

	// functions go in the middle
	function createPuzzlePieces(pictureIndex) {
		// Generate images here -> need to make 4 ( top left, right, bottom left, right)
		//debugger;
		// loop through the images refs and generate one for each
		thePieces.forEach((piece, index) => {
			let newPuzzlePiece = `<img id="piece${index}" class="puzzle-image"
				src="images/${piece + pictureIndex}.jpg" alt="puzzle piece" draggable>`;
			piecesBoard.innerHTML += newPuzzlePiece;
		});

		initDrag();
	}

	// drag and drop functionality
	//  this is a 3-step process
	//   1. handle the drag event
	//   2. handle the dragover event
	//   3. handle the drop event
	
	//   dragging sets some data reference (an audio track name, image source, etc)
	//   dragiver -> just prevent the default behaviour
	//   on a drop is where the magic happens -> script that behaviour, get the data reference and 
	//   do what you need to do with it
	
	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				console.log('dragin...');
				e.dataTransfer.setData("text/plain", this.id);
			});

		});
	}

	// handle the drop
	
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
			console.log('dragged over me!');
		});

		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log('you dropped somethin on me');
			
			if (zone.children.length > 0) {
				return;
			}

			let piece = e.dataTransfer.getData("text/plain");
			e.target.appendChild(document.querySelector(`#${piece}`));

		});
	});

	function resetPuzzlePieces() {
		// change the curent puzzle, regenerate the pieces
		//debugger;
		// clean out the puzzle pieces div
		piecesBoard.innerHTML = "";

		dropZones.forEach(a => {a.innerHTML =""
		});
		document.querySelector('.puzzle-pieces').children.length > 0

		// generate new pieces
		createPuzzlePieces(this.dataset.puzzleref);
	}

	// event handling goes here
	puzzleSelectors.forEach(button => button.addEventListener("click", resetPuzzlePieces));


	//call this function to set up / generate the pieces on load
	createPuzzlePieces(0);
	
	
})();
