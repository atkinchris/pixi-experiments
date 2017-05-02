# Ideas and Tasks

* ~~Implement `moveTo(Tile tile)`, taking a tile and moving towards it's centre, based on `dt`.~~
* Abstract moveable actor, to create a base for player and enemies.
* ~~Create `playerController` to remove `input` handling from player object.~~
* Move to tile, get remainder; if not zero, get next tile and `moveTo` with remainder.
* Check if tile is portal - and if so, update `posX` and `posY` to portal output.
* When `reached` (at new tile) check if input direction is one of the tiles valid exits. If so, assign currentHeading.
* Pass a `handler` to player/moveable type, call it when `reached=true`.
* Combine `mapper` and `tileMap`.
* Only use world coordinates in renderable components - map coordinates in all others.
* `inputHandler` -> `stateUpdate` -> `render`
* Have actor get destination on every/intermitant updates, and trust it. Allows for snap movement by player.

1. Work out the next location, based on `dt` and direction.
2. Find that tile with world coordinates on the map.
3. If that tile is not equal to the current tile:
  1. if that tile is passable, assign it as the current tile.
  2. if that tile needs a decision in direction, set it as the destination.
