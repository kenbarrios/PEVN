import Api from '@/http/Api'

export default {
  updateItem (params) {
    return Api().put('todos/' + params.todoId + '/items/' + params.itemId, params)
  }
}
