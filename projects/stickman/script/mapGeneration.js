function genMap0() {
    for (var x = 0; x < mapTileWidth; x++) {
      clearAll();
      backgroundImg = backgroundOutside;

      for (var x = 0; x < mapTileWidth; x++) {
        map.push([]);
          for (var y = 10; y < 12; y++) {
            map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
          }
        }
        mapText.push(new text(400, 200, "30px Tahoma", "black", "Get in the portal to start the tutorial"));
        portal.x = mapTileWidth*50 -150;
        portal.y = 350;
  }
}
  function genMap1() {
      for (var x = 0; x < mapTileWidth; x++) {
        clearAll();
        backgroundImg = backgroundOutside;
        for (var x = 29; x < 42; x++) {
          map.push([]);
            for (var y = 7; y < 10; y++) {
              map[x][y] = new tile(x, y, 50, 50, (x < 40 && x > 30) ? true : false, 0, metalImg);
            }
          }
        for (var x = 24; x < 26; x++) {
          map.push([]);
            for (var y = 0; y < 9; y++) {
              map[x][y] = new tile(x, y, 50, 50, (x < 40 && x > 30) ? true : false, 0, metalImg);
            }
          }
        for (var x = 18; x < 20; x++) {
          map.push([]);
            for (var y = 4; y < 10; y++) {
              map[x][y] = new tile(x, y, 50, 50, false, 0, metalImg);
            }
          }
          for (var x = 16; x < 22; x++) {
            map.push([]);
              for (var y = 7; y < 10; y++) {
                map[x][y] = new tile(x, y, 50, 50, false, 0, metalImg);
              }
            }


        for (var x = 60; x < 63; x++) {
          map.push([]);
            for (var y = 0; y < 10; y++) {
              map[x][y] = new tile(x, y, 50, 50, false, 2, wood);
            }
          }
          for (var x = 70; x < 72; x++) {
            map.push([]);
              for (var y = 0; y < 10; y++) {
                map[x][y] = new tile(x, y, 50, 50, false, 0, metalImg);
              }
            }

        for (var x = 0; x < mapTileWidth; x++) {
          map.push([]);
            for (var y = 10; y < 12; y++) {
              map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
            }
          }
          spawnSmallMonster(2000,300);
          spawnSmallMonster(1900,300);
          spawnSmallMonster(1800,300);
          onMapItems.push(new item(26*50+13, 9*50-5, 24, 30, 0, 0, 0.05, -45, 0, 0.02, 1, ak47Mag));
          onMapItems.push(new item(27*50+13, 9*50-5, 24, 30, 0, 0, 0.05, -45, 0, 0.02, 1, ak47Mag));
          onMapItems.push(new item(28*50+13, 9*50-5, 24, 30, 0, 0, 0.05, -45, 0, 0.02, 1, ak47Mag));
          onMapItems.push(new item(45*50+15, 9*50-5, 20, 30, 0, 0, 0.05, -30, 0, 0.02, 1, healthImg));
          onMapItems.push(new item(50*50+20, 9*50-5, 10, 30, 0, 0, 0.05, -30, 0, 0.02, 1, c4Img));
          onMapItems.push(new item(52*50+15, 9*50+5, 20, 20, 0, 0, 0.05, -30, 0, 0.02, 1, granadeImg));
          onMapItems.push(new item(51*50+20, 9*50-5, 10, 30, 0, 0, 0.05, -30, 0, 0.02, 1, c4Img));
          onMapItems.push(new item(53*50+15, 9*50+5, 20, 20, 0, 0, 0.05, -30, 0, 0.02, 1, granadeImg));
          onMapItems.push(new item(65*50+20, 9*50-5, 10, 30, 0, 0, 0.05, -30, 0, 0.02, 1, c4Img));
          onMapItems.push(new item(75*50+20, 9*50, 20, 20, 0, 0, 0.05, -30, 0, 0.02, 1, stoneImg));
          mapText.push(new text(200, 100, "30px Tahoma", "black", "Move with A and D"));
          mapText.push(new text(200, 150, "30px Tahoma", "black", "Hold LeftShift to run"));
          mapText.push(new text(750, 100, "30px Tahoma", "black", "Jump with W and crouch with S"));
          mapText.push(new text(1600, 100, "30px Tahoma", "black", "Insert/drop magazine with R"));
          mapText.push(new text(1600, 150, "30px Tahoma", "black", "LefClick to shoot"));
          mapText.push(new text(1600, 200, "30px Tahoma", "black", "Press B to switch fire mode"));
          mapText.push(new text(2500, 150, "30px Tahoma", "black", "Press E to switch explosive"));
          mapText.push(new text(2500, 200, "30px Tahoma", "black", "Press G to throw"));
          mapText.push(new text(3700, 100, "30px Tahoma", "black", "Press C to enter build mode"));
          mapText.push(new text(3700, 150, "30px Tahoma", "black", "LeftClick to place blocks"));
          mapText.push(new text(3700, 200, "30px Tahoma", "black", "RightClick to pickup blocks"));

          portal.x = mapTileWidth*50 -150;
          portal.y = 350;
    }
  }
    function genMap2() {
        clearAll();
          backgroundImg = backgroundOutside;
          map[16][9] = {x: 16*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: grassGround};
          map[17][9] = {x: 17*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: dirtGround};
          map[18][9] = {x: 18*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: dirtGround};
          map[17][8] = {x: 17*50, y: 8*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: grassGround};
          map[18][8] = {x: 18*50, y: 8*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: dirtGround};
          map[18][7] = {x: 18*50, y: 7*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: grassGround};

          map[23][9] = {x: 23*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: grassGround};
          map[22][9] = {x: 22*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: dirtGround};
          map[21][9] = {x: 21*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: dirtGround};
          map[22][8] = {x: 22*50, y: 8*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: grassGround};
          map[21][8] = {x: 21*50, y: 8*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: dirtGround};
          map[21][7] = {x: 21*50, y: 7*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: grassGround};

            for (var x = 25; x < 36; x++) {
              map.push([]);
                for (var y = 4; y < 5; y++) {
                  map[x][y] = new tile(x, y, 50, 50, false, 2, wood);
                }
              }
              for (var x = 48; x < 55; x++) {
                map.push([]);
                  for (var y = 7; y < 8; y++) {
                    map[x][y] = new tile(x, y, 50, 50, false, 0, grassGround);
                  }
                }
                map[48][9] = {x: 48*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: metalImg};
                map[48][8] = {x: 48*50, y: 8*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: metalImg};
                map[70][9] = {x: 70*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: dirtGround};
                map[70][8] = {x: 70*50, y: 8*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: grassGround};
                map[71][9] = {x: 71*50, y: 9*50, sizeX: 50, sizeY: 50, walkable: false, hp: 0, image: grassGround};
                for (var x = 55; x < 70; x++) {
                  map.push([]);
                    for (var y = 7; y < 10; y++) {
                      map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                    }
                  }
                  for (var x = 80; x < 120; x++) {
                    map.push([]);
                      for (var y = 0; y < 10; y++) {
                        map[x][y] = new tile(x, y, 50, 50, false, 2, wood);
                      }
                    }
                    map[79][6] = {x: 79*50, y: 6*50, sizeX: 50, sizeY: 50, walkable: false, hp: 2, image: wood};
                    map[78][6] = {x: 78*50, y: 6*50, sizeX: 50, sizeY: 50, walkable: false, hp: 2, image: wood};
                    map[77][6] = {x: 77*50, y: 6*50, sizeX: 50, sizeY: 50, walkable: false, hp: 2, image: wood};
                    map[80][5].walkable = true;
                    map[81][5].walkable = true;
                    map[82][5].walkable = true;

                    map[83][5].walkable = true;
                    map[84][5].walkable = true;
                    map[85][5].walkable = true;
                    map[86][5].walkable = true;
                    map[87][5].walkable = true;

                    for (var x = 88; x < 110; x++) {
                      map.push([]);
                        for (var y = 3; y < 8; y++) {
                          map[x][y] = new tile(x, y, 50, 50, true, 0, wood);
                        }
                      }
                      map[88][6] = {x: 88*50, y: 6*50, sizeX: 50, sizeY: 50, walkable: false, hp: 2, image: wood};
                      for (var x = 130; x < 160; x++) {
                        map.push([]);
                          for (var y = 9; y < 10; y++) {
                            map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                          }
                        }
                        for (var x = 140; x < 150; x++) {
                          map.push([]);
                            for (var y = 8; y < 10; y++) {
                              map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                            }
                          }
                          for (var x = 144; x < 146; x++) {
                            map.push([]);
                              for (var y = 0; y < 8; y++) {
                                map[x][y] = new tile(x, y, 50, 50, false, 0, metalImg);
                              }
                            }
                            for (var x = 120; x < 144; x++) {
                              map.push([]);
                                for (var y = 0; y < 1; y++) {
                                  map[x][y] = new tile(x, y, 50, 50, false, 2, wood);
                                }
                              }
          for (var x = 0; x < mapTileWidth; x++) {
            map.push([]);
              for (var y = 10; y < 12; y++) {
                map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
              }
            }
            map[19][10] = {x: 19*50, y: 10*50, sizeX: 50, sizeY: 50, walkable: true, hp: 0, image: dirtGround};
            map[19][11] = {x: 19*50, y: 11*50, sizeX: 50, sizeY: 50, walkable: true, hp: 0, image: dirtGround};
            map[20][10] = {x: 20*50, y: 10*50, sizeX: 50, sizeY: 50, walkable: true, hp: 0, image: dirtGround};
            map[20][11] = {x: 20*50, y: 11*50, sizeX: 50, sizeY: 50, walkable: true, hp: 0, image: dirtGround};
//--------------------------------ITEMS-----------------------------------------
onMapItems.push(new item(28*50+20, 3*50-5, 20, 20, 0, 0, 0.05, -30, 0, 0.02, 1, granadeImg));
onMapItems.push(new item(30*50+20, 3*50-5, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
onMapItems.push(new item(32*50+20, 3*50-5, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
onMapItems.push(new item(52*50+20, 9*50-5, 20, 30, 0, 0, 0.05, -30, 0, 0.02, 1, healthImg));
onMapItems.push(new item(54*50+20, 9*50-5, 20, 30, 0, 0, 0.05, -30, 0, 0.02, 1, healthImg));
onMapItems.push(new item(53*50+20, 9*50-5, 10, 30, 0, 0, 0.05, -30, 0, 0.02, 1, c4Img));
onMapItems.push(new item(88*50+20, 7*50-5, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
onMapItems.push(new item(89*50+20, 7*50-5, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
onMapItems.push(new item(90*50+20, 7*50-5, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
onMapItems.push(new item(106*50+20, 7*50-5, 20, 30, 0, 0, 0.05, -30, 0, 0.02, 1, healthImg));
onMapItems.push(new item(107*50+20, 7*50-5, 20, 30, 0, 0, 0.05, -30, 0, 0.02, 1, healthImg));
onMapItems.push(new item(108*50+20, 6*50-5, 20, 20, 0, 0, 0.05, -30, 0, 0.02, 1, granadeImg));
onMapItems.push(new item(109*50+20, 6*50-5, 20, 20, 0, 0, 0.05, -30, 0, 0.02, 1, granadeImg));
//---------------------------------Enemies--------------------------------------
spawnSmallMonster(1500,300);
spawnSmallMonster(2500,400);
spawnSmallMonster(2600,400);
spawnSmallMonster(2800,200);
spawnSmallMonster(2900,200);
spawnSmallMonster(3000,200);
spawnSmallMonster(4700,200);
spawnSmallMonster(4900,200);
spawnSmallMonster(4950,200);
spawnSmallMonster(5000,200);
spawnSmallMonster(5100,200);
spawnSmallMonster(6700,200);
//--------------------------------Trees-----------------------------------------
            trees.push({x: 400,
                        y: 120,
                        sizeX: 300,
                        sizeY: 400,
                        img: tree
                      });
            trees.push({x: 2500,
                        y: -30,
                        sizeX: 300,
                        sizeY: 400,
                        img: tree
                      });
            trees.push({x: 2900,
                        y: -30,
                        sizeX: 300,
                        sizeY: 400,
                        img: tree
                      });
            trees.push({x: mapTileWidth*50-1000,
                        y: 140,
                        sizeX: 300,
                        sizeY: 370,
                        img: christmasTree
                      });
                      portal.x = mapTileWidth*50 -150;
                      portal.y = 350;
        mapText.push(new text(300, 200, "40px Tahoma", "black", "Level 1"));
      }
      function genMap3() {
        clearAll();
          backgroundImg = backgroundOutside;

          for (var x = 20; x < 28; x++) {
            map.push([]);
              for (var y = 8; y < 12; y++) {
                map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
              }
            }
            map[20][8].walkable = true;
            map[23][9].walkable = true;
            map[24][9].walkable = true;
            map[25][9].walkable = true;
            map[23][8] = new tile(23, 8, 50, 50, false, 2, wood);
            map[24][8] = new tile(24, 8, 50, 50, false, 2, wood);
            map[25][8] = new tile(25, 8, 50, 50, false, 2, wood);
            map[20][9].image = grassGround;
            map[33][5] = new tile(33, 5, 50, 50, false, 0, metalImg);
            map[34][5] = new tile(34, 5, 50, 50, false, 0, metalImg);
            map[35][5] = new tile(35, 5, 50, 50, false, 0, metalImg);
            map[36][5] = new tile(36, 5, 50, 50, false, 0, metalImg);
            map[36][4] = new tile(36, 4, 50, 50, false, 0, metalImg);

            map[45][7] = new tile(45, 7, 50, 50, false, 0, metalImg);
            map[46][7] = new tile(46, 7, 50, 50, false, 0, metalImg);
            map[46][6] = new tile(46, 6, 50, 50, false, 0, metalImg);
            map[46][5] = new tile(46, 5, 50, 50, false, 0, metalImg);
            map[46][4] = new tile(46, 4, 50, 50, false, 0, metalImg);
            map[47][4] = new tile(47, 4, 50, 50, false, 0, metalImg);
            map[48][4] = new tile(48, 4, 50, 50, false, 0, metalImg);
            map[49][4] = new tile(49, 4, 50, 50, false, 0, metalImg);
            map[50][4] = new tile(50, 4, 50, 50, false, 0, metalImg);
            map[51][4] = new tile(51, 4, 50, 50, false, 0, metalImg);
            map[52][4] = new tile(52, 4, 50, 50, false, 0, metalImg);
            map[47][7] = new tile(47, 7, 50, 50, false, 0, metalImg);
            map[48][7] = new tile(48, 7, 50, 50, false, 0, metalImg);
            map[49][7] = new tile(49, 7, 50, 50, false, 0, metalImg);
            map[50][7] = new tile(50, 7, 50, 50, false, 0, metalImg);
            map[51][7] = new tile(51, 7, 50, 50, false, 0, metalImg);
            map[52][7] = new tile(52, 7, 50, 50, false, 0, metalImg);

            map[59][2] = new tile(59, 2, 50, 50, false, 0, metalImg);
            map[60][2] = new tile(60, 2, 50, 50, false, 0, metalImg);
            map[61][2] = new tile(61, 2, 50, 50, false, 0, metalImg);
            map[62][2] = new tile(62, 2, 50, 50, false, 0, metalImg);
            //----------------------------PILLARS-------------------------------
            for (var x = 80; x < 83; x++) {
              map.push([]);
                for (var y = 7; y < 10; y++) {
                  map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                }
              }
              for (var x = 89; x < 92; x++) {
                map.push([]);
                  for (var y = 4; y < 10; y++) {
                    map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                  }
                }
                for (var x = 99; x < 102; x++) {
                  map.push([]);
                    for (var y = 3; y < 10; y++) {
                      map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                    }
                  }
                  for (var x = 109; x < 122; x++) {
                    map.push([]);
                      for (var y = 3; y < 10; y++) {
                        map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                      }
                    }
                    for (var x = 130; x < 133; x++) {
                      map.push([]);
                        for (var y = 5; y < 10; y++) {
                          map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                        }
                      }
                      for (var x = 140; x < 143; x++) {
                        map.push([]);
                          for (var y = 7; y < 10; y++) {
                            map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                          }
                        }
                        for (var x = 150; x < 180; x++) {
                          map.push([]);
                            for (var y = 5; y < 10; y++) {
                              map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                            }
                          }

              //------------------holes above ground----------------------------
              for (var x = 158; x < 177; x++) {
                map.push([]);
                  for (var y = 5; y < 10; y++) {
                    map[x][y] = new tile(x, y, 50, 50, true, 0, dirtGround);
                  }
                }
                map[150][9].image = grassGround;
                map[150][8].walkable = true;
                map[150][7].walkable = true;
                map[150][6].walkable = true;
                map[150][5].walkable = true;
                map[151][8].image = grassGround;
                map[151][7].walkable = true;
                map[151][6].walkable = true;
                map[151][5].walkable = true;
                map[152][7].image = grassGround;
                map[152][6].walkable = true;
                map[152][5].walkable = true;
                map[153][6].image = grassGround;
                map[153][5].walkable = true;

              //-----------------ground-----------------------------------------
          for (var x = 0; x < mapTileWidth; x++) {
            map.push([]);
              for (var y = 10; y < 12; y++) {
                map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
              }
            }
            //---------------holes in the ground--------------------------------
            for (var x = 28; x < 72; x++) {
              map.push([]);
                for (var y = 10; y < 12; y++) {
                  map[x][y] = new tile(x, y, 50, 50, true, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                }
              }
              for (var x = 112; x < 119; x++) {
                map.push([]);
                  for (var y = 0; y < 12; y++) {
                    map[x][y] = new tile(x, y, 50, 50, true, 0, dirtGround);
                  }
                }
                for (var x = 122; x < 130; x++) {
                  map.push([]);
                    for (var y = 0; y < 12; y++) {
                      map[x][y] = new tile(x, y, 50, 50, true, 0, dirtGround);
                    }
                  }
                  for (var x = 133; x < 140; x++) {
                    map.push([]);
                      for (var y = 0; y < 12; y++) {
                        map[x][y] = new tile(x, y, 50, 50, true, 0, dirtGround);
                      }
                    }
                    for (var x = 180; x < 210; x++) {
                      map.push([]);
                        for (var y = 0; y < 12; y++) {
                          map[x][y] = new tile(x, y, 50, 50, true, 0, dirtGround);
                        }
                      }
                map[89][9] = new tile(89, 9, 50, 50, false, 2, wood);
                map[90][9] = new tile(90, 9, 50, 50, false, 2, wood);
                map[91][9] = new tile(91, 9, 50, 50, false, 2, wood);
                map[99][9] = new tile(99, 9, 50, 50, false, 2, wood);
                map[100][9] = new tile(100, 9, 50, 50, false, 2, wood);
                map[101][9] = new tile(101, 9, 50, 50, false, 2, wood);

                map[165][3] = new tile(165, 3, 50, 50, false, 0, metalImg);
                map[166][3] = new tile(166, 3, 50, 50, false, 0, metalImg);
                map[167][3] = new tile(167, 3, 50, 50, false, 0, metalImg);

                map[176][6] = new tile(176, 6, 50, 50, false, 0, metalImg);
                map[158][7] = new tile(158, 7, 50, 50, false, 0, metalImg);

                map[186][5] = new tile(186, 5, 50, 50, false, 0, metalImg);
                map[187][5] = new tile(187, 5, 50, 50, false, 0, metalImg);
                map[188][5] = new tile(188, 5, 50, 50, false, 0, metalImg);

                map[195][8] = new tile(195, 8, 50, 50, false, 0, metalImg);
                map[196][8] = new tile(196, 8, 50, 50, false, 0, metalImg);
                map[197][8] = new tile(197, 8, 50, 50, false, 0, metalImg);

                map[200][5] = new tile(200, 5, 50, 50, false, 0, metalImg);
                map[201][5] = new tile(201, 5, 50, 50, false, 0, metalImg);
                map[202][5] = new tile(202, 5, 50, 50, false, 0, metalImg);
                //------------smallMonsters-------------------------------------
                spawnSmallMonster(8640,300);
                spawnSmallMonster(8540,300);
                spawnSmallMonster(8440,300);
                spawnSmallMonster(8340,300);
                spawnSmallMonster(8240,300);
                spawnSmallMonster(5250,300);
          trees.push({x: mapTileWidth*50-1000,
                      y: 140,
                      sizeX: 300,
                      sizeY: 370,
                      img: christmasTree
                    });
            portal.x = mapTileWidth*50 -150;
            portal.y = 350;
            mapText.push(new text(300, 200, "40px Tahoma", "black", "Level 2"));
            //------------items-------------------------------------------------
            onMapItems.push(new item(47*50+20, 6*50-5, 10, 30, 0, 0, 0.05, -30, 0, 0.02, 1, c4Img));
            onMapItems.push(new item(48*50+20, 6*50, 20, 20, 0, 0, 0.05, -30, 0, 0.02, 1, stoneImg));
            onMapItems.push(new item(49*50+20, 6*50-5, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
            onMapItems.push(new item(24*50+20, 9*50+5, 20, 20, 0, 0, 0.05, -30, 0, 0.02, 1, granadeImg));
            onMapItems.push(new item(95*50+20, 9*50-5, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
            onMapItems.push(new item(105*50+20, 9*50-5, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
            onMapItems.push(new item(178*50+15, 4*50-5, 20, 30, 0, 0, 0.05, -30, 0, 0.02, 1, healthImg));
      }
        function genMap4() {
          clearAll();
              backgroundImg = backgroundCave;
              snowFlakesON = false;
              while (snowFlakes.length > 0) {snowFlakes.pop();}
              clearInterval(snowFlakesInterval);

        //------------First quest-----------------------------------------------
        //------------------1st hill--------------------------------------------
              for (var x = 20; x < 38; x++) {
                map.push([]);
                  for (var y = 6; y < 10; y++) {
                    map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
                  }
                }

          map[20][6].walkable = true;
          map[20][7].walkable = true;
          map[20][8].walkable = true;
          map[21][6].walkable = true;
          map[21][7].walkable = true;
          map[22][6].walkable = true;

          map[20][9].image = caveGroundImg;
          map[21][8].image = caveGroundImg;
          map[22][7].image = caveGroundImg;

          map[37][6].walkable = true;

          map[37][7].image = metalImg;
          map[37][8].image = metalImg;
          map[37][9].image = metalImg;

          //------------------2nd hill--------------------------------------------
                for (var x = 37; x < 60; x++) {
                  map.push([]);
                    for (var y = 2; y < 4; y++) {
                      map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == false) ? caveGroundFlipImg : caveStoneImg);
                    }
                  }

            map[76][3] = new tile(76, 3, 50, 50, false, 2, wood);
            map[77][2] = new tile(77, 2, 50, 50, false, 0, caveStoneImg);
            map[77][3] = new tile(77, 3, 50, 50, false, 0, caveGroundFlipImg);
            //pillars-----------------------------------------------------------
            for (var x = 70; x < 71; x++) {
              map.push([]);
                for (var y = 7; y < 10; y++) {
                  map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
                }
              }
              for (var x = 75; x < 76; x++) {
                map.push([]);
                  for (var y = 2; y < 7; y++) {
                    map[x][y] = new tile(x, y, 50, 50, false, 0, caveStoneImg);
                  }
                }
                map[75][6].image = caveGroundFlipImg;
                for (var x = 80; x < 81; x++) {
                  map.push([]);
                    for (var y = 7; y < 10; y++) {
                      map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
                    }
                  }

            for (var x = 115; x < 116; x++) {
              map.push([]);
                for (var y = 7; y < 10; y++) {
                  map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
                }
              }
              for (var x = 120; x < 121; x++) {
                map.push([]);
                  for (var y = 2; y < 7; y++) {
                    map[x][y] = new tile(x, y, 50, 50, false, 0, caveStoneImg);
                  }
                }
                map[120][6].image = caveGroundFlipImg;
                for (var x = 125; x < 126; x++) {
                  map.push([]);
                    for (var y = 7; y < 10; y++) {
                      map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
                    }
                  }
                  for (var x = 130; x < 131; x++) {
                    map.push([]);
                      for (var y = 5; y < 10; y++) {
                        map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
                      }
                    }
                    for (var x = 135; x < 165; x++) {
                      map.push([]);
                        for (var y = 2; y < 7; y++) {
                          map[x][y] = new tile(x, y, 50, 50, false, 0, caveStoneImg);
                        }
                      }
                      for (var x = 135; x < 165; x++) {
                        map.push([]);
                          for (var y = 6; y < 7; y++) {
                            map[x][y] = new tile(x, y, 50, 50, false, 0, caveGroundFlipImg);
                          }
                        }
                        for (var x = 143; x < 160; x++) {
                          map.push([]);
                            for (var y = 3; y < 9; y++) {
                              map[x][y] = new tile(x, y, 50, 50, true, 0, caveStoneImg);
                            }
                          }
                          for (var x = 143; x < 160; x++) {
                            map.push([]);
                              for (var y = 3; y < 4; y++) {
                                map[x][y] = new tile(x, y, 50, 50, false, 0, caveGroundFlipImg);
                              }
                            }
//-------------------Last fight-------------------------------------------------
for (var x = 210; x < 216; x++) {
  map.push([]);
    for (var y = 6; y < 10; y++) {
      map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
    }
  }
  map[210][6].walkable = true;
  map[210][7].walkable = true;
  map[215][6].walkable = true;
  map[215][7].walkable = true;
  map[210][8].image = caveGroundImg;
  map[215][8].image = caveGroundImg;

  for (var x = 225; x < 231; x++) {
    map.push([]);
      for (var y = 6; y < 10; y++) {
        map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
      }
    }
    map[225][6].walkable = true;
    map[225][7].walkable = true;
    map[230][6].walkable = true;
    map[230][7].walkable = true;
    map[225][8].image = caveGroundImg;
    map[230][8].image = caveGroundImg;

//-------------------roof and ground--------------------------------------------
              for (var x = 0; x < mapTileWidth; x++) {
                map.push([]);
                  for (var y = 10; y < 12; y++) {
                    map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? caveGroundImg : caveStoneImg);
                  }
                }
                for (var x = 0; x < mapTileWidth; x++) {
                  map.push([]);
                    for (var y = 1; y < 2; y++) {
                      map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y+1].walkable == true) ? caveGroundFlipImg : caveStoneImg);
                    }
                  }
                  for (var x = 0; x < mapTileWidth; x++) {
                    map.push([]);
                      for (var y = 0; y < 1; y++) {
                        map[x][y] = new tile(x, y, 50, 50, false, 0, caveStoneImg);
                      }
                    }
                    //q1--------------------------------------------------------
                    for (var x = 24; x < 37; x++) {
                      map.push([]);
                        for (var y = 8; y < 11; y++) {
                          map[x][y] = new tile(x, y, 50, 50, true, 0, caveStoneImg);
                        }
                      }
                      for (var x = 24; x < 37; x++) {
                        map.push([]);
                          for (var y = 11; y < 12; y++) {
                            map[x][y] = new tile(x, y, 50, 50, false, 0, caveGroundImg);
                          }
                        }
                        for (var x = 24; x < 37; x++) {
                          map.push([]);
                            for (var y = 7; y < 8; y++) {
                              map[x][y] = new tile(x, y, 50, 50, false, 0, caveGroundFlipImg);
                            }
                          }
                          for (var x = 131; x < 135; x++) {
                            map.push([]);
                              for (var y = 2; y < 12; y++) {
                                map[x][y] = new tile(x, y, 50, 50, true, 0, caveGroundFlipImg);
                              }
                            }
                            for (var x = 170; x < 203; x++) {
                              map.push([]);
                                for (var y = 3; y < 12; y++) {
                                  map[x][y] = new tile(x, y, 50, 50, true, 0, caveStoneImg);
                                }
                              }
                          map[37][10].image = metalImg;
                          map[24][10] = new tile(24, 10, 50, 50, false, 2, wood);
                          map[24][9] = new tile(24, 9, 50, 50, false, 2, wood);
                          map[27][8] = new tile(27, 8, 50, 50, false, 2, wood);
                          map[28][8] = new tile(28, 8, 50, 50, false, 2, wood);
                          map[36][10] = new tile(36, 10, 50, 50, false, 2, wood);
                          map[36][9] = new tile(36, 9, 50, 50, false, 2, wood);
                          map[36][8] = new tile(36, 8, 50, 50, false, 2, wood);
                          map[35][10] = new tile(35, 10, 50, 50, false, 2, wood);
//-----------door---------------------------------------------------------------
                for (var x = 100; x < 101; x++) {
                  map.push([]);
                    for (var y = 1; y < 7; y++) {
                      map[x][y] = new tile(x, y, 50, 50, false, 0, caveStoneImg);
                    }
                  }
                map[100][7] = new tile(100, 7, 50, 50, false, 0, metalDoorImg);
                map[100][8] = new tile(100, 8, 50, 50, false, 0, metalDoorImg);
                map[100][9] = new tile(100, 9, 50, 50, false, 0, metalDoorImg);

                map[176][10] = new tile(176, 10, 50, 50, false, 0, caveGroundImg);
                map[177][10] = new tile(177, 10, 50, 50, false, 0, caveGroundImg);
                map[178][10] = new tile(178, 10, 50, 50, false, 0, caveGroundImg);
                map[185][10] = new tile(185, 10, 50, 50, false, 0, caveGroundImg);
                map[186][10] = new tile(186, 10, 50, 50, false, 0, caveGroundImg);
                map[187][10] = new tile(187, 10, 50, 50, false, 0, caveGroundImg);
                map[194][10] = new tile(194, 10, 50, 50, false, 0, caveGroundImg);
                map[195][10] = new tile(195, 10, 50, 50, false, 0, caveGroundImg);
                map[196][10] = new tile(196, 10, 50, 50, false, 0, caveGroundImg);
                map[186][5] = new tile(186, 5, 50, 50, false, 0, caveGroundImg);

                turrets.push(new Turret(45*50, 4*50, 0, 0, 0, false));
                turrets.push(new Turret(145*50, 4*50, 0, 0, 0, false));
                turrets.push(new Turret(149*50, 4*50, 0, 0, 0, false));
                turrets.push(new Turret(153*50, 4*50, 0, 0, 0, false));
                turrets.push(new Turret(157*50, 4*50, 0, 0, 0, false));
                spawnSmallMonster(120*50,400);
                spawnSmallMonster(220*50,400);
                spawnSmallMonster(223*50,400);
                onMapItems.push(new item(76*50+15, 2*50+5, 10, 30, 0, 0, 0.05, -30, 0, 0.02, 1, c4Img));
                onMapItems.push(new item(24*50+15, 10*50+20, 20, 10, 0, 0, 0.05, -30, 0, 0.02, 1, keyYImg));
                onMapItems.push(new item(28*50+15, 7*50+20, 24, 30, 0, 0, 0.05, -30, 0, 0.02, 1, ak47Mag));
                onMapItems.push(new item(27*50+15, 7*50+20, 20, 30, 0, 0, 0.05, -30, 0, 0.02, 1, healthImg));
                onMapItems.push(new item(186*50+15, 4*50-5, 20, 30, 0, 0, 0.05, -30, 0, 0.02, 1, healthImg));
                mapText.push(new text(400, 200, "30px Tahoma", "white", "Level 3"));
                mapText.push(new text(4500, 200, "30px Tahoma", "white", "You might need a key for this one..."));
                portal.x = mapTileWidth*50 -150;
                portal.y = 350;
          }
          function genMap5() {
              for (var x = 0; x < mapTileWidth; x++) {
                clearAll();
                backgroundImg = backgroundOutside;

                for (var x = 0; x < mapTileWidth; x++) {
                  map.push([]);
                    for (var y = 10; y < 12; y++) {
                      map[x][y] = new tile(x, y, 50, 50, false, 0, (map[x][y-1].walkable == true) ? grassGround : dirtGround);
                    }
                  }
                  mapText.push(new text(250, 200, "80px Tahoma", "black", "GAME COMPLETED!"));
                  mapText.push(new text(500, 230, "15px Tahoma", "black", "(took longer than expected...)"));
                  mapText.push(new text(1050, 300, "30px Tahoma", "black", "Back to start"));
                  fireworks();
                  portal.x = mapTileWidth*50 -150;
                  portal.y = 350;
            }
          }
function clearAll() {
  for (var x = 0; x < mapTileWidth; x++) {
    map.push([]);
      for (var y = 0; y < 14; y++) {
        map[x][y] = new tile(x, y, 50, 50, true, 0, dirtGround);
      }
    }
    //---------rensar allt på banan---------------------------------------------
    while (mapText.length > 0)       {mapText.shift();}
    while (smallMonsters.length > 0) {smallMonsters.shift();}
    while (onMapItems.length > 0)    {onMapItems.shift();}
    while (trees.length > 0)         {trees.shift();}
    while (turrets.length > 0)         {turrets.shift();}
    while (shells.length > 0)         {shells.shift();}
    while (shots.length > 0)         {shots.shift();}
    while (c4s.length > 0)         {c4s.shift();}
    while (granades.length > 0)         {granades.shift();}
    while (spark.length > 0)         {spark.shift();}
    while (splash.length > 0)         {splash.shift();}
}
