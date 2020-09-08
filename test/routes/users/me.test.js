const faker = require('faker');
const { some } = require('lodash');
const { expect } = require('chai');
const mongoose = require('mongoose');
const { describe, it, beforeEach } = require('mocha');

require('../setup');
const { request } = require('../helpers');
const createUsers = require('../fixtures/users');
const { hashPassword } = require('../../app/services/auth');

// TODO: Find a way on how to automate or a helper for logged-in users
