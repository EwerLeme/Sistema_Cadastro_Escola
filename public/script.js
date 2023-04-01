var tabela = document.querySelector('.tbody')
var button = document.querySelector('.filter button')

button.addEventListener('click', getTurma);

function getTurma() {
  tabela.innerHTML = ''
  var id = document.querySelector('.filter input').value

  fetch(`/listar-turma/${id}`)
  .then(response => response.json())
  .then(data => {
      var dados = data.dados
  
      dados.map((dado) => {
          tabela.innerHTML += `
            <tr>
              <td>${dado.aluno.nome}</td>
              <td>${dado.aluno.data_nascimento}</td>
              <td>
                <select>
                  <option value="opcao1">Presente</option>
                  <option value="opcao2">Faltou</option>
                </select>
              </td>
            </tr>  
          `
      })
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}