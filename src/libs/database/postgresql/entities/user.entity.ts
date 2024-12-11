import { User } from '@prisma/client';

class UserEntity implements User {
  id: number;
  email: string;
  password: string;
  linkedinLink: string;
  roleName: string;
  profileAvatar: string;
  temporalExhibitionLink: string;
  profileIsActivated: boolean = false;
  followers: number;
  lastEntry: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(
    _email: string,
    _password: string,
    _linkedinLink: string,
    _roleName: string,
    _profileAvatar: string,
    _temporalExhibitionLink: string,
    _profileIsActivated: boolean,
    _id?: number,
    _followers?: number,
    _lastEntry?: Date,
    _createdAt?: Date,
    _updatedAt?: Date,
    _deletedAt?: Date,
  ) {
    this.email = _email;
    this.password = _password;
    this.linkedinLink = _linkedinLink;
    this.roleName = _roleName;
    this.profileAvatar = _profileAvatar;
    this.temporalExhibitionLink = _temporalExhibitionLink;
    this.profileIsActivated = _profileIsActivated;

    if (_id) {
      this.id = _id;
    }
    if (_followers) {
      this.followers = _followers;
    }
    if (_lastEntry) {
      this.lastEntry = _lastEntry;
    }
    if (_createdAt) {
      this.createdAt = _createdAt;
    }
    if (_updatedAt) {
      this.updatedAt = _updatedAt;
    }
    if (_deletedAt) {
      this.deletedAt = _deletedAt;
    }
  }
}

export { UserEntity };
