import {hsv2rgb} from '../common/hsv2rgb'
import Vector3 from '../common/Vector3';

export default class Box {
  constructor() {
    this.positions = [];
    this.indices = [];
		this.color = [];

    this.createGeometry();
  }

	createGeometry() {


		/*
				4  7
				5  6
			0  3
			1  2
		*/
		this.positions.push(
			-0.5, 0.5, 0.5, // upperLeft: 0
			-0.5, -0.5, 0.5, // lowerLeft: 1
			0.5, -0.5, 0.5, //lowerRight: 2
			0.5, 0.5, 0.5, // upperRight: 3
			-0.5, 0.5, -0.5, // upperLeft: 4
			-0.5, -0.5, -0.5, // lowerLeft: 5
			0.5, -0.5, -0.5, //lowerRight: 6
			0.5, 0.5, -0.5 // upperRight: 7
		);

		this.color.push(
			0, 1, 0,
			0, 0, 0,
			1, 0, 0,
			1, 1, 0,
			0, 1, 1,
			0, 0, 1,
			1, 0, 1,
			1, 1, 1,
		);
		this.indices.push(
			// 正面
			0, 1, 2,
			2, 3, 0,

			// 右側面
			3, 2, 6,
			6, 7, 3,

			// 後側面
			7, 6, 5,
			5, 4, 7,

			// 左側面
			4, 5, 1,
			1, 0, 4,

			// 上側面
			0, 3, 7,
			7, 5, 0,

			// 下側面
			2, 1, 5,
			5, 6, 2,
		)
	}
}