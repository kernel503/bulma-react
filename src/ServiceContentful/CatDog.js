import { createEmployee, createDisability, updateEmployee, deleteEmployee } from './contentful-management';
import { getAllEmployee, getAllDisability } from './contentful-delivery';
const CatDog = {
  createEmployee,
  createDisability,
  updateEmployee,
  deleteEmployee,
  getAllEmployee,
  getAllDisability,
};

export default CatDog;
