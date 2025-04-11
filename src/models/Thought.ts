import { Schema, model } from 'mongoose' 
import reactionSchema from './Reaction.ts'

interface IThought extends Document {
    thoughtText: String,
    CreatedAt: Schema.Types.Date,
    username: String,
    reactions: Schema.Types.ObjectId[]
}

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: any) => dateFormat(timestamp)
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
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;
