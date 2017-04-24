* Implement `moveTo(Tile tile)`, taking a tile and moving towards it's centre, based on `dt`.
* Abstract moveable actor, to create a base for player and enemies.
* Create `playerController` to remove `input` handling from player object.
* Move to tile, get remainder; if not zero, get next tile and `moveTo` with remainder.
* Check if tile is portal - and if so, update `posX` and `posY` to portal output.
* When `reached` (at new tile) check if input direction is one of the tiles valid exits. If so, assign currentHeading.
* Pass a `handler` to player/moveable type, call it when `reached=true`.
