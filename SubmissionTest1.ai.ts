
survDirection = 'none';
turn =0;

function main(gameState, side){
	console.log(side)
	const myTeam = gameState.teamStates[side];
  	var moveArr = [];
  	pathState = gameState;
  	firstDude = myTeam[0];
  	secondDude = myTeam[1];
  	thirdDude = myTeam[2];
  	bestPathFound = false;
      	currSurviveDistance = -6
      	while(bestPathFound == false && currSurviveDistance<0){
          [x,y] = firstDude.coord;
          Path = PathFind1(x,y, pathState, currSurviveDistance, side); 
          if(Path >= 0){
            bestPathFound = true;
          }
          else{
          	pathState = gameState;
            currSurviveDistance ++;
            console.log("NO PATH FOUND1");
          }
          
        }
  	Dude1Direct = survDirection;
  	bestPathFound = false;
      currSurviveDistance = -6
      while(bestPathFound == false && currSurviveDistance<0){
         [x,y] = thirdDude.coord;
        if(PathFind3(x,y, pathState, currSurviveDistance, side) >= 0){
            bestPathFound = true;
          }
          else{
            pathState = gameState;
          	currSurviveDistance++;
            console.log("NO PATH FOUND3");
            console.log(currSurviveDistance);
          }
          
        }
  	Dude3Direct = survDirection;
    
  	bestPathFound = false;
    	currSurviveDistance = -6
      	while(bestPathFound == false && currSurviveDistance<0){
          [x,y] = secondDude.coord;
          if(PathFind2(x,y, pathState, currSurviveDistance, side) >= 0){
            bestPathFound = true;
          }
          else{
          	pathState = gameState;
            currSurviveDistance ++;
            console.log("NO PATH FOUND2");
          }
          
        }
  	Dude2Direct = survDirection;
  	console.log(turn);
  	turn++;
  	return [Dude1Direct, Dude2Direct, Dude3Direct];
}



//================================================================================================================================================
//				PATHFINDING RECUSIVE FUNCTIONS			
//================================================================================================================================================
//	These functions are used recursively to find a path, within the 7x7 grid, of the given "pathLength", only avoiding tiles that have a 
//	strength of 1 or greater. Different functions give different priority to the four movement options so that the monsters will hinder
//	eachother as little as they can while maximizing tile damage to the other side. 
//	No considerations are made for the positions of other monsters in chossing the path other than the weakness in tiles other monsters
//	cause while standing on them.
//================================================================================================================================================



//================================================================================================================================================
//				PATHFINDING RECUSIVE FUNCTIONS			FIRST PATHFINDER VVV
//================================================================================================================================================
//				INPUTS: (x, y) => Gives the x and y coordinates of the monster in question
//						pathState => Used to get the state of tiles before they are added to the path
//				 		pathLength => The desired length of the path you want the monster to find
//						side => tells the function what side the monster is starting on 
//
//				OUTPUT: returns the direction the monster should go (N,S,E,W)
//================================================================================================================================================
function PathFind1(x, y, pathState, pathLength, side){
	
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF HOME SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.South		v
	//	2.East		>
	//	3.West		<
	//	4.North		^
	//------------------------------------------------------------------------------------------------------------------------

	if(side == 'home'){
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
		if(x<6){
		  if(pathState.tileStates[x+1][y] > 1){	
			SouthPath = PathFind1(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind1(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind1(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}
	  if(x>0){
		  if(pathState.tileStates[x-1][y] > 1){
			  NorthPath = PathFind1(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}
		return pathLength-1;
	}
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF AWAY SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.North		^
	//	2.West		<
	//	3.East		>
	//	4.South		v
	//------------------------------------------------------------------------------------------------------------------------

	
	else{
	
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
		
		if(x>0){
		  if(pathState.tileStates[x-1][y] > 1){
			  NorthPath = PathFind1(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}

		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind1(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}
		
		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind1(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		
		if(x<6){
		  if(pathState.tileStates[x+1][y] > 1){	
			SouthPath = PathFind1(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
		
		
		return pathLength-1;
	
	}
	
}


//================================================================================================================================================
//				PATHFINDING RECUSIVE FUNCTIONS			SECOND PATHFINDER VVV
//================================================================================================================================================
//				INPUTS: (x, y) => Gives the x and y coordinates of the monster in question
//						pathState => Used to get the state of tiles before they are added to the path
//				 		pathLength => The desired length of the path you want the monster to find
//						side => tells the function what side the monster is starting on 
//
//				OUTPUT: returns the direction the monster should go (N,S,E,W)
//================================================================================================================================================


function PathFind2(x, y, pathState, pathLength, side){
	
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF HOME SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.North		^
	//	2.East		>
	//	3.West		<
	//	4.South		v
	//------------------------------------------------------------------------------------------------------------------------
	
	
	if(side == 'home'){
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
	  if(x>0){
		 if(pathState.tileStates[x-1][y] > 1){
			NorthPath = PathFind2(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}
	  if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind2(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind2(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}
	  if(x<6){
		 if(pathState.tileStates[x+1][y] > 1){	
			SouthPath = PathFind2(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
		return pathLength-1;
	}
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF AWAY SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.South		v
	//	2.West		<
	//	3.East		>
	//	4.North		^
	//------------------------------------------------------------------------------------------------------------------------
	
	else{
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;

		if(x<6){
		 if(pathState.tileStates[x+1][y] > 1){	
			SouthPath = PathFind2(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}		

		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind2(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}
		
		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind2(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		
		if(x>0){
		 if(pathState.tileStates[x-1][y] > 1){
			NorthPath = PathFind2(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}
		return pathLength-1;
		
	}
	
}


//================================================================================================================================================
//				PATHFINDING RECUSIVE FUNCTIONS			THIRD PATHFINDER VVV
//================================================================================================================================================
//				INPUTS: (x, y) => Gives the x and y coordinates of the monster in question
//						pathState => Used to get the state of tiles before they are added to the path
//				 		pathLength => The desired length of the path you want the monster to find
//						side => tells the function what side the monster is starting on 
//
//				OUTPUT: returns the direction the monster should go (N,S,E,W)
//================================================================================================================================================


function PathFind3(x, y, pathState, pathLength, side){
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF HOME SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.South		v
	//	2.East		>
	//	3.West		<
	//	4.North		^
	//------------------------------------------------------------------------------------------------------------------------
	if(side == 'home'){
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
	 
		if(x<6){
		 if(pathState.tileStates[x+1][y] > 1){
			SouthPath = PathFind3(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
	  

		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind3(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind3(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}

		if(x>0){
		 if(pathState.tileStates[x-1][y] > 1){
			NorthPath = PathFind3(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}
		return pathLength-1;
	}
	
	//------------------------------------------------------------------------------------------------------------------------
	// 			PRIORITY IF AWAY SIDE
	//------------------------------------------------------------------------------------------------------------------------
	//	1.North		^
	//	2.West		<
	//	3.East		>
	//	4.North		v
	//------------------------------------------------------------------------------------------------------------------------
	
	else{
		if(pathLength >= 0){
			return pathLength;
		}
		
		pathState.tileStates[x][y] -= 1;
		maxPath = 0;
	 
	  
		if(x>0){
		 if(pathState.tileStates[x-1][y] > 1){
			NorthPath = PathFind3(x-1, y, pathState, pathLength + 1);
			if(NorthPath >= 0){
				survDirection = 'north';
				return NorthPath;

			}
		  }
		}

		if(y>0){
		  if(pathState.tileStates[x][y-1] > 1){
			WestPath = PathFind3(x, y-1, pathState, pathLength + 1);
			if(WestPath >= 0){
				survDirection = 'west';
				return WestPath;
			}
		  }
		}

		if(y<6){
		  if(pathState.tileStates[x][y+1] > 1){
			EastPath = PathFind3(x, y+1, pathState, pathLength + 1);
			if(EastPath >= 0){
				survDirection = 'east';
				return EastPath;
			}
		  }
		}
		
		
		if(x<6){
		 if(pathState.tileStates[x+1][y] > 1){
			SouthPath = PathFind3(x+1, y, pathState, pathLength+1);
			if(SouthPath >= 0){
				survDirection = 'south';
				return SouthPath;
			}
		  }
		}
		
		return pathLength-1;
		
	}
}
