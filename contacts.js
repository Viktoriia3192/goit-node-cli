import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.resolve("db", "contacts.json");


export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data)
}

export async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

export async function removeContact(id) {
  const remContact = await listContacts();
  const index = remContact.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = remContact.splice(index, 1);
  return result;
}

export async function addContact(data) {
  const contact = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data
  }
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
}
