const Project = require("../models/project");

// GET all projects
exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

// CREATE project
exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
};
console.log(Project);