const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  day: String,
  nome: String,
  descricao: String,
  exercicio: String,
  series: Number,
  repeticoes: Number,
  peso_max: Number,
  repeticoes_peso_max: Number,
  data_completado: Date
});

const Workout = mongoose.model('workout', workoutSchema);

module.exports = Workout;