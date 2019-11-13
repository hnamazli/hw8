$('#imgModal').on('show.bs.modal', function (e) {
  let img = $(e.relatedTarget);
  let link = img.attr('src');
  let modal = $(this);
  
  modal.find('img').attr('src', link);
});