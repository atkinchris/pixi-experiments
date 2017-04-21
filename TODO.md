* Implement `moveTo(Tile tile)`, taking a tile and moving towards it's centre, based on `dt`.
* Abstract moveable actor, to create a base for player and enemies.
* Create `playerController` to remove `input` handling from player object.
* Move to tile, get remainder; if not zero, get next tile and moveto with remainder.