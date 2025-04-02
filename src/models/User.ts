import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
	name: string;
	email: string;
	thoughts: Schema.Types.ObjectId[];
	friends: Schema.Types.ObjectId[]; //Note - this is going to be referencing the Users...
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true, //TODO: is this how you do "trimmed"?
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /.+@.+\..+/
			//TODO: Add Mongoose matching validation - must match a valid email address
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'thought',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

//TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model<IUser>('user', userSchema);

export default User;
