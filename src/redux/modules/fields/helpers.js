
export function getQuestionsData (tab, item, questions) {
  return {
    sequential: true,
    ops: questions.map(q => {
      if (q._type === 'new') {
        return {
          method: 'post',
          url: `api/users/tabs/${tab}/items/${item}/fields`,
          params: {
            field: {
              name: q.name,
              field_type: q.field_type,
              required: !!q.required,
              position: q.idx,
              values: q.options ? q.options.map(qo => qo.children).join(',') : null
            }
          }
        }
      } else if (q._type === 'delete') {
        return {
          method: 'delete',
          url: `api/users/tabs/${tab}/items/${item}/fields/${q.id}`
        }
      } else if (q._type === 'edit' && q._resType === 'done') {
        return {
          method: 'patch',
          url: `api/users/tabs/${tab}/items/${item}/fields/${q.id}`,
          params: {
            field: {
              name: q.name,
              field_type: q.field_type,
              required: !!q.required,
              position: q.idx,
              values: q.options ? q.options.map(qo => qo.children).join(',') : null
            }
          }
        }
      }
    })
  }
}

export function getQuestionsResult (results) {
  const succeed = []
  const failed = []
  results.forEach((r, idx) => {
    if (r.status === 200) {
      succeed.push(r.body)
    } else {
      failed.push(r.body)
    }
  })

  return { succeed: succeed, failed: failed }
}
