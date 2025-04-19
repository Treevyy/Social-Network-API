import { Schema, Types, model } from 'mongoose' 
import { dateFormat } from '../utils/dateFormate.js'


interface IThought extends Document {
    thoughtText: String,
    CreatedAt: Schema.Types.Date,
    username: String,
    reactions: Schema.Types.ObjectId[]
}

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: String,
    username: String,
    createdAt: Schema.Types.Date
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
            get: (timestamp: any) => dateFormat(timestamp)
        },
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: true,
        id: false,
    }
);

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
