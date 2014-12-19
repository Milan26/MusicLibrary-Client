/**
 * Created by Milan on 12.12.2014.
 */

controllers.controller('AlbumController',
    function ($scope, AlbumsFactory, AlbumFactory, $window, DTOptionsBuilder, DTColumnDefBuilder) {

            var error_panel = $("#error-panel");

            $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap();
            $scope.dtOptions = {
                dom: '<"top"lfp<"clear">>rt<"bottom"i<"clear">>',
                paginationType: 'full_numbers'
            };
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable(),
                DTColumnDefBuilder.newColumnDef(4).notSortable(),
                DTColumnDefBuilder.newColumnDef(5).notSortable(),
                DTColumnDefBuilder.newColumnDef(6).notSortable()
            ];

            /**
             * Create custom album object to prevent copying all fields (don't wanna send songs, artists... with album)
             * @param album album to be copied from
             * @returns custom album object
             */
            function createAlbumToBeUpdated(album) {
                return {
                    id: album.id,
                    title: album.title,
                    releaseDate: album.releaseDate,
                    coverArt: album.coverArt,
                    note: album.note
                };
            }

            $scope.doneEditing = function (album) {
                if (!album.editing) {
                    album.editing = true;
                    return;
                }
                resetErrorPanel();
                AlbumsFactory.update({}, createAlbumToBeUpdated(album),
                    //success
                    function (value) {
                        $scope.addAlbumForm.error = false;
                        album.editing = false;
                    },
                    //error
                    function (error) {
                        buildErrorPanel(error.data);
                        album.selected = true;
                        $scope.addAlbumForm.error = true;
                    }
                );
            };

            $scope.createAlbum = function () {
                resetErrorPanel();
                AlbumsFactory.create({}, $scope.albumToBeAdded,
                    //success
                    function (value) {
                        $scope.addAlbumForm.error = false;
                        $window.location.reload();
                    },
                    //error
                    function (error) {
                        if (error.data != "")
                            buildErrorPanel(error.data);
                        $scope.addAlbumForm.error = true;
                    }
                )
            };

            $scope.deleteAlbum = function (albumId) {
                AlbumFactory.delete({id: albumId});
                $window.location.reload();
            };

            function buildErrorPanel(data) {
                error_panel.append("<ul>");
                for (var i = 0; i < data.fieldErrors.length; i++) {
                    error_panel.append(
                        "<li>" + "<b>" + data.fieldErrors[i].field + "</b>: " + data.fieldErrors[i].message + "</li>");
                }
                error_panel.append("</ul>");
            }

            function resetErrorPanel() {
                error_panel.html('<div></div>');
            }

            AlbumsFactory.getAll(
                //success
                function (value) {
                    $scope.albums = value;
                },
                //error
                function (error) {
                    notReachableMessage = "We're sorry. Server is unreachable. Try again later.";
                    $scope.addAlbumForm.error = true;
                    error_panel.append("<span>" + notReachableMessage + "</span>");
                }
            );
        }
);
