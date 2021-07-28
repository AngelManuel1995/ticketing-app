'use strict'

import request from 'supertest'
import { app } from '../../app'

it('Should return a 201 on a successful signup', async () => {
  return request(app)
		.post('/api/users/signup')
		.send({
			email:'test@test.com',
			password: 'password' 
		})
		.expect(201)
})

it('Should return a 400 with an invalid email', async () => {
  return request(app)
		.post('/api/users/signup')
		.send({
			email:'aksjkasnjknjsa',
			password: 'password' 
		})
		.expect(400)
})

it('Should return a 400 with an invalid password', async () => {
  return request(app)
		.post('/api/users/signup')
		.send({
			email:'test@test.com',
			password: 'p' 
		})
		.expect(400)
})

it('Should return a 400 with missing email and password', async () => {
  await request(app)
		.post('/api/users/signup')
		.send({
			email:'test@arus.com.co'
		})
		.expect(400)

  await request(app)
		.post('/api/users/signup')
		.send({
			email:'1912778asbh'
		})
		.expect(400)
})

it('Should disallow a duplicated email', async () => {
  await request(app)
		.post('/api/users/signup')
		.send({
			email:'test@test.com',
			password: 'password' 
		})
		.expect(201)

  await request(app)
		.post('/api/users/signup')
		.send({
			email:'test@test.com',
			password: 'password' 
		})
		.expect(400)
})

it('Should set a cookie after successful signup', async () => {
  const response = await request(app)
		.post('/api/users/signup')
		.send({
			email:'test@test.com',
			password: 'password' 
		})
		.expect(201)

		expect(response.get('Set-Cookie')).toBeDefined()
})