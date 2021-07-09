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
}, { timestamps: true })

UserSchema.statics.build = async function (attrs: UserAttrs) {
	return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema)

const user = User.build({email:'as', password:'as'})

export { User }