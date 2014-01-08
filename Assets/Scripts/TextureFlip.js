#pragma strict
var originalX : float;

function Start() {
	originalX = transform.localScale.x;
}

function Update() {
	var motor = transform.parent.gameObject.GetComponent(CharacterMotor);
	if (motor.movement.velocity.x > 0) {
		transform.localScale.x = originalX;
	} else if (motor.movement.velocity.x < 0) {
		transform.localScale.x = -originalX;
	}
}
