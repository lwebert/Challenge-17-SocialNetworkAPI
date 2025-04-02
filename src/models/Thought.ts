import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
	reactionId: Schema.Types.ObjectId;
	reactionBody: string;
	username: string;
	createdAt: Date;
}

interface IThought extends Document {
	thoughtText: string;
	createdAt: Date;
	username: string;
	reactions: Schema.Types.ObjectId[];
}

const reactionSchema = new Schema<IReaction>(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: {
			getters: true,
		},
		timestamps: true,
		_id: false,
	}
);

const thoughtSchema = new Schema<IThought>(
	{
		thoughtText: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

export default Thought;
export { reactionSchema };
