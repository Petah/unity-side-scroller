#pragma strict


var animateTexture : AnimateTexture;
var motor : CharacterMotor;
var jumping : boolean = false;

function Start() {
	animateTexture = gameObject.GetComponent(AnimateTexture);
	motor = transform.parent.gameObject.GetComponent(CharacterMotor);
}

function Update() {
	var colNumber : int = animateTexture.GetColNumber();
//	Debug.Log(AlmostEqual(motor.movement.velocity.y, 0, 0.01));
	if (AlmostEqual(motor.movement.velocity.y, 0, 0.01)) {
		jumping = false;
	}
	if (!AlmostEqual(motor.movement.velocity.y, 0, 0.01)) {
//		Debug.Log(colNumber + ", " + animateTexture.rowNumber);
		if (!jumping) {
			jumping = true;
			SetAnimation(0, 3, 9, 10);
			SetAnimation(9, 3, 1, 1);
		} else if (motor.movement.velocity.y > 0 &&
				colNumber >= 9) {
//			Debug.Log(motor.movement.velocity.y + ", " + colNumber);
			jumping = true;
			SetAnimation(9, 3, 1, 1);
		} else if (motor.movement.velocity.y < 0) {
			SetAnimation(10, 3, 19, 10);
			SetAnimation(9, 3, 1, 1);
		}
	} else if (motor.movement.velocity.x) {
		if (animateTexture.rowNumber != 1 &&
				animateTexture.rowNumber != 2) {
			SetAnimation(0, 1, 4, 10);
		} else if (animateTexture.rowNumber == 1 &&
				colNumber >= 3) {
			SetAnimation(0, 2, 10, 10);
		}
	} else {
		SetAnimation(0, 0, 14, 10);
	}
}

function SetAnimation(colNumber, rowNumber, totalCells, fps) {
	animateTexture.colNumber = colNumber;
	animateTexture.rowNumber = rowNumber;
	animateTexture.totalCells = totalCells;
	animateTexture.fps = fps;
}

function AlmostEqual(a: float, b : float, epsilon : float) {
    return Mathf.Abs(a - b) < epsilon;
}
