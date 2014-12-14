/**
 * Created by Milan on 12.12.2014.
 */

var app = angular.module('musicLibrary-client.controllers', []);

app.controller('AlbumController', ['$scope', 'AlbumsFactory', 'AlbumFactory', '$window', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        function ($scope, AlbumsFactory, AlbumFactory, $window, DTOptionsBuilder, DTColumnDefBuilder) {

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

            function isAlbumValid(album) {
                if (album.title == null || album.title == "") {
                    album.msg = "Cannot be empty";
                    return false;
                }
                return true;
            }

            $scope.isSelected = function (album) {
                if (!isAlbumValid(album)) {
                    album.selected = true;
                }
                album.selected ? $scope.makeAlbumEditable(album) : $scope.doneEditing(album);
            };

            $scope.doneEditing = function (album) {
                album.editing = false;
                AlbumsFactory.update({}, createAlbumToBeUpdated(album));
            };

            $scope.makeAlbumEditable = function (album) {
                album.editing = true;
            };

            $scope.deleteAlbum = function (albumId) {
                AlbumFactory.delete({id: albumId});
                $window.location.reload();
            };

            $scope.createAlbum = function () {
                AlbumsFactory.create({}, $scope.albumToBeAdded);
                $window.location.reload();
            };

            $scope.albums = AlbumsFactory.getAll();
        }]
);
