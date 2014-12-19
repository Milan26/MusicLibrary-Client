/**
 * Created by Milan on 19.12.2014.
 */

controllers.controller('SongController',
        function ($scope, SongsFactory, SongFactory, SongUpdateFactory,
                  AlbumsFactory, ArtistsFactory, GenreFactory, $window, DTOptionsBuilder, DTColumnDefBuilder) {

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
                DTColumnDefBuilder.newColumnDef(3),
                DTColumnDefBuilder.newColumnDef(4),
                DTColumnDefBuilder.newColumnDef(5),
                DTColumnDefBuilder.newColumnDef(6),
                DTColumnDefBuilder.newColumnDef(7),
                DTColumnDefBuilder.newColumnDef(8).notSortable(),
                DTColumnDefBuilder.newColumnDef(9).notSortable(),
                DTColumnDefBuilder.newColumnDef(10).notSortable()
            ];

            /**
             * Create custom album object to prevent copying all fields
             * @param song song to be copied from
             * @returns custom song object
             */
            function createSongToBeUpdated(song) {
                return {
                    id: song.id,
                    title: song.title,
                    trackNumber: song.trackNumber,
                    duration: song.duration,
                    genre: song.genre,
                    bitrate: song.bitrate,
                    note: song.note
                };
            }

            $scope.doneEditing = function (song) {
                if (!song.editing) {
                    song.editing = true;
                    return;
                }
                resetErrorPanel();
                SongUpdateFactory.update({album_id: song.album.id, artist_id: song.artist.id},
                    createSongToBeUpdated(song),
                    //success
                    function (value) {
                        $scope.addSongForm.error = false;
                        song.editing = false;
                    },
                    //error
                    function (error) {
                        buildErrorPanel(error.data);
                        song.selected = true;
                        $scope.addSongForm.error = true;
                    }
                );
            };

            $scope.createSong = function () {
                resetErrorPanel();
                SongsFactory.create({}, $scope.songToBeAdded,
                    //success
                    function (value) {
                        $scope.addSongForm.error = false;
                        $window.location.reload();
                    },
                    //error
                    function (error) {
                        if (error.data != "")
                            buildErrorPanel(error.data);
                        $scope.addSongForm.error = true;
                    }
                )
            };

            $scope.deleteSong = function (songId) {
                SongFactory.delete({id: songId});
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

            $scope.songs = SongsFactory.getAll();
            $scope.genres = GenreFactory.getAll();
            $scope.albums = AlbumsFactory.getAll();
            $scope.artists = ArtistsFactory.getAll();
        }
);
