export class CharacterController {
  constructor(model, speed = 0.1) {
    this.model = model;
    this.speed = speed;
    this.movingDirection = null;

    this.model.position.x = Math.random() * 20 - 10;
    this.model.position.y = 0;
    this.model.position.z = Math.random() * 10 - 5; 
  }

 update(KP) {
      if (KP['ArrowLeft']) {
        this.model.position.z -= this.speed;
      }
      if (KP['ArrowRight']) {
        this.model.position.z += this.speed; 
      }
      if (KP['ArrowUp']) {
        this.model.position.x += this.speed;
      }
      if (KP['ArrowDown']) {
        this.model.position.x -= this.speed; 
      }

      if (KP['KeyK']) {
        if (KP['ArrowLeft']){
            this.movingDirection = 'left';
        } 
        if (KP['ArrowRight']) {
            this.movingDirection = 'right';
        }
        if (KP['ArrowUp']) {
            this.movingDirection = 'up';
        }
        if (KP['ArrowDown']) {
            this.movingDirection = 'down';
        }
      }
    
      if (this.movingDirection) {
        if (this.movingDirection === 'left') {
            this.model.position.z -= this.speed;
        } 
        if (this.movingDirection === 'right') {
            this.model.position.z += this.speed;
        } 
        if (this.movingDirection === 'up') {
            this.model.position.x += this.speed;
        } 
        if (this.movingDirection === 'down') {
            this.model.position.x -= this.speed;
        }
      }

       if (KP['KeyL']) {
            this.movingDirection = null;
    }
  }
}