//----------------------Spawns snow ever second---------------------------------
snowFlakesInterval = setInterval(function(){ genSnowFlakes()}, 1000);
//----------------------Changes map length and generates new map----------------
function newMap() {
  clearInterval(shootFireworks);
  switch (mapChoice) {
    case 0:
    mapTileWidth = 25;
    genMap0();
    break;
    case 1:
      mapTileWidth = 110;
      genMap1();
      break;
    case 2:
      mapTileWidth = 200;
      genMap2();
      break;
      case 3:
        mapTileWidth = 250;
        genMap3();
        break;
        case 4:
          mapTileWidth = 250;
          genMap4();
          break;
          case 5:
            mapTileWidth = 25;
            genMap5();
            break;
    default:
    mapChoice = 0;
    newMap();
  }
}

newMap();
update();
