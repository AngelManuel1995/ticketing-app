import { Password } from '../services/password'

import mongoose from 'mongoose'

interface UserAttrs {
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, { 
	timestamps: true, 
	toJSON: { 
		transform (doc, rec) {
			rec.id = rec._id
			delete rec.createdAt
			delete rec.updatedAt
			delete rec._id
			delete rec.password
			delete rec.__v
		}
	} 
})

UserSchema.pre('save', async function(done) {
	if(this.isModified('password')){
		const hashed = await Password.toHash(this.get('password'))
		this.set('password', hashed)
		done()
	}
})

UserSchema.statics.build = function (attrs: UserAttrs) {
	return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema)

export { User }